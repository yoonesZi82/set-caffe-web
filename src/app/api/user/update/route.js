import { generateAccessToken } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function PUT(req) {
  try {
    const body = await req.json();
    const { name, email, image, userID } = body;

    if (!name) {
      return new Response(JSON.stringify({ message: "Name Is Trim" }), {
        status: 401,
      });
    }
    if (!email) {
      return new Response(JSON.stringify({ message: "Email Is Trim" }), {
        status: 402,
      });
    }
    if (!userID) {
      return new Response(JSON.stringify({ message: "UserID is not found" }), {
        status: 403,
      });
    }

    const user = await db.user.findFirst({
      where: { id: userID },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User is not found" }), {
        status: 407,
      });
    }

    const updateData = { name, email };
    if (image) {
      updateData.image = image;
    }

    await db.user.update({
      where: { id: user.id },
      data: updateData,
    });

    const accessToken = generateAccessToken({ email });

    const headers = new Headers();
    headers.append("Set-Cookie", `token=${accessToken};path=/;httpOnly=true`);

    return new Response(
      JSON.stringify({ message: "User updated successfully :))" }),
      {
        status: 200,
        headers: headers,
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: `Unknown error in update user API --> ${err}`,
      }),
      { status: 500 }
    );
  }
}
