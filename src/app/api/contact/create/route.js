import { validateEmail, validatePhone } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name, company, phone, message, userID } = body;

    if (!name.trim() || !message.trim()) {
      return Response.json(
        { message: "Name & message is required" },
        { status: 401 }
      );
    }

    if (!validateEmail(email)) {
      return Response.json({ message: "Email in not valid" }, { status: 402 });
    }

    if (!validatePhone(phone)) {
      return Response.json({ message: "Phone in not valid" }, { status: 403 });
    }

    if (phone.length > 11) {
      return Response.json({ message: "Phone is not valid" }, { status: 405 });
    }

    await db.contact.create({
      data: {
        email,
        name,
        company,
        phone,
        message,
        user: {
          connect: { id: userID },
        },
      },
    });

    return Response.json({ message: "New Message Is create" }, { status: 201 });
  } catch (err) {
    return Response.json(
      { message: `Error Contact API Is --> ${err}` },
      { status: 500 }
    );
  }
}
