import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function PUT(req) {
  try {
    const body = await req.json();
    const { userID } = body;

    if (!userID) {
      return Response.json({ message: "User ID is required" }, { status: 401 });
    }

    const user = await db.user.findFirst({
      where: { id: userID },
    });

    if (!user) {
      return Response.json({ message: "User Not Found" }, { status: 401 });
    }

    await db.user.update({
      where: { id: userID },
      data: {
        role: user.role === "USER" ? "ADMIN" : "USER",
      },
    });

    return Response.json({ message: "User Role Update Successfully" });
  } catch (err) {
    return Response.json(
      { message: `Unknown Error Is Put Role User --> ${err}` },
      { status: 500 }
    );
  }
}
