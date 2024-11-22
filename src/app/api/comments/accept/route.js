import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return Response.json({ message: "Id is required" }, { status: 401 });
    }

    const comment = await db.comment.findFirst({
      where: { id },
    });

    if (!comment) {
      return Response.json({ message: "Comment is not find" }, { status: 403 });
    }

    await db.comment.update({
      where: { id: comment.id },
      data: { isAccept: true },
    });

    return Response.json({ message: "Accept Comment Successfully :))" });
  } catch (err) {
    return Response.json(
      { message: `Unknown Error In Accept Comment API --> ${err.message}` },
      { status: 500 }
    );
  }
}
