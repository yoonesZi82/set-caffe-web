import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const db = new PrismaClient();

export async function PUT(req) {
  try {
    const body = await req.json();
    const { password, newPassword, userID } = body;

    if (!password) {
      return Response.json(
        { message: "Password is required" },
        { status: 401 }
      );
    }
    if (!newPassword) {
      return Response.json(
        { message: "New password is required" },
        { status: 402 }
      );
    }

    const user = await db.user.findFirst({
      where: { id: userID },
    });

    if (!user) {
      return Response.json({ message: "User is not found" }, { status: 403 });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return Response.json(
        { message: "Old password is not valid" },
        { status: 405 }
      );
    }

    if (password === newPassword) {
      return Response.json(
        { message: "Password & new password no equal" },
        { status: 406 }
      );
    }

    const hashPassword = await bcrypt.hash(newPassword, 12);

    if (!hashPassword) {
      return Response.json(
        { message: "Password is not hash" },
        { status: 407 }
      );
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashPassword,
      },
    });

    return Response.json({ message: "Password updated" });
  } catch (err) {
    return Response.json(
      { message: `Unknown error in update password API --> ${err}` },
      { status: 500 }
    );
  }
}
