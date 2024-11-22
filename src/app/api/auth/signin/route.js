import { PrismaClient } from "@prisma/client";
import {
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePassword,
  verifyPassword,
} from "@/utils/auth";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email.trim() || !password.trim()) {
      return Response.json(
        { message: " Email Or Password Is Not Correct" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return Response.json(
        { message: "Password Is Not Correct" },
        { status: 401 }
      );
    }

    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    if (!isValidEmail || !isValidPassword) {
      return Response.json(
        { message: "Email Or Password Is Not Valid" },
        { status: 402 }
      );
    }

    const user = await db.user.findFirst({
      where: { email },
    });

    if (!user) {
      return Response.json({ message: "User Is Not Define" }, { status: 422 });
    }

    if (user.isBan) {
      return Response.json({ message: "User is ban" }, { status: 423 });
    }

    const isCorrectPasswordWithHas = await verifyPassword(
      password,
      user.password
    );

    if (!isCorrectPasswordWithHas) {
      return Response.json(
        { message: "Email Or Password Is Not Correct" },
        { status: 403 }
      );
    }

    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

    await db.user.update({
      where: { id: user.id },
      data: {
        refreshToken,
      },
    });

    const headers = new Headers();
    headers.append("Set-Cookie", `token=${accessToken};path=/;httpOnly=true;`);
    headers.append(
      "Set-Cookie",
      `refresh-token=${refreshToken};path=/;httpOnly=true;`
    );

    return Response.json(
      { message: "User Is Login Successfully" },
      {
        status: 200,
        headers,
      }
    );
  } catch (err) {
    console.log(err);

    return Response.json(
      { message: `Error For Login Is --> ${err}` },
      { status: 500 }
    );
  }
}
