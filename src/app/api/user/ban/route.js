import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function PUT(req) {
  try {
    const body = await req.json();
    const { userID, isBan } = body;

    if (!userID) {
      return Response.json({ message: "UserID is required" }, { status: 401 });
    }

    const user = await db.user.findFirst({
      where: { id: userID },
    });

    if (!user) {
      return Response.json({ message: "User is not found" }, { status: 405 });
    }

    await db.user.update({
      where: { id: user.id },
      data: { isBan },
    });
    return Response.json({ message: "User is update ban" }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: `Unknown Error In Ban API --> ${err}` },
      { status: 500 }
    );
  }
}
