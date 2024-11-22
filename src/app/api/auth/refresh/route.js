import { generateAccessToken } from "@/utils/auth";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const refreshToken = cookies().get("refresh-token").value;

    if (!refreshToken) {
      return Response.json(
        { message: "No Have Refresh Token !!" },
        { status: 401 }
      );
    }

    const user = await db.user.findFirst({
      where: { refreshToken },
    });

    if (!user) {
      return Response.json({ message: "User is not fine" }, { status: 401 });
    }

    verify(refreshToken, process.env.RefreshTokenSecretKey);
    const newAccessToken = await generateAccessToken({ email: user.email });

    return Response.json(
      { message: "New Access Token Is Create" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${newAccessToken};path=/;httpOnly=true;`,
        },
      }
    );
  } catch (err) {
    return Response.json({
      message: `Unknown Error in Refresh Token API --> ${err}`,
    });
  }
}
