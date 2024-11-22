import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { userID } = body;

    if (!userID) {
      return Response.json({ message: "User ID Is Required" }, { status: 401 });
    }

    const user = await db.user.findFirst({
      where: { id: userID },
    });

    if (!user) {
      return Response.json({ message: "User Not Found" }, { status: 402 });
    }

    await db.user.delete({
      where: { id: user.id },
    });

    return Response.json({ message: "User is remove" });
  } catch (err) {
    return Response.json(
      { message: `Unknown Error In Delete User API Is --> ${err}` },
      { status: 500 }
    );
  }
}
