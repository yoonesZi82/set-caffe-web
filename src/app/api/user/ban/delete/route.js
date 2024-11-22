import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { userID } = body;

    if (!userID) {
      return Response.json({ message: "UserID is required" }, { status: 401 });
    }

    const user = await db.user.findFirst({
      where: { id: userID },
    });

    if (!user) {
      return Response.json({ message: "User is not found" }, { status: 405 });
    }

    const ban = await db.ban.findFirst({
      where: {
        OR: [{ phone: user.phone }, { email: user.email }],
      },
    });

    if (!ban) {
      return Response.json({ message: "User is not ban" }, { status: 406 });
    }

    await db.ban.delete({
      where: { id: ban.id },
    });

    return Response.json({ message: "User is remove ban" });
  } catch (err) {
    return Response.json(
      { message: `Unknown error in remove ban API --> ${err}` },
      { status: 500 }
    );
  }
}
