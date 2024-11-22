import { hashPassword } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { phone, password, confirmPassword } = body;

    if (phone.length > 11) {
      return Response.json({ message: "Phone is not Valid" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return Response.json(
        { message: "Password is not equal" },
        { status: 401 }
      );
    }

    const user = await db.user.findFirst({
      where: { phone },
    });

    if (!user) {
      return Response.json({ message: "User is not find" }, { status: 402 });
    }
    const hashedPassword = await hashPassword(password);

    await db.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
    return Response.json(
      { message: "Password is changed successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: `Unknown Error In Forget Password API --> ${err}` },
      { status: 500 }
    );
  }
}
