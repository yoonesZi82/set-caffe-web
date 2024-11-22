import { hashPassword } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
import { roles } from "@/utils/constants";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, email, password } = body;

    if (!name.trim() || !phone.trim() || !password.trim() || !email.trim()) {
      return Response.json({ message: "Data is not valid" }, { status: 400 });
    }

    if (phone.length < 11) {
      return Response.json(
        { message: "Phone number is not valid" },
        { status: 401 }
      );
    }

    if (password.length < 8) {
      return Response.json(
        { message: "Password is not valid" },
        { status: 402 }
      );
    }

    const isUserExistByEmail = await db.user.findFirst({
      where: { email },
    });

    const isUserExistByPhone = await db.user.findFirst({
      where: { phone },
    });

    if (isUserExistByEmail || isUserExistByPhone) {
      return Response.json(
        { message: "The email or phone is already" },
        { status: 422 }
      );
    }
    const hashedPassword = await hashPassword(password);

    const users = await db.user.count({});

    await db.user.create({
      data: {
        name,
        phone,
        email,
        password: hashedPassword,
        role: users > 0 ? roles.USER : roles.ADMIN,
      },
    });

    return Response.json(
      { message: "User Is Create" },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      { message: `Unknown Error in create user API --> ${err}` },
      { status: 500 }
    );
  }
}
