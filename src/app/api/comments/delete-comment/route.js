import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function DELETE(req) {
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

    await db.comment.delete({
      where: { id: comment.id },
    });

    return Response.json({ message: "Delete Comment Is Successfully" });
  } catch (err) {
    return Response.json(
      { message: `Unknown Error In Delete Comment API --> ${err}` },
      { status: 500 }
    );
  }
}
