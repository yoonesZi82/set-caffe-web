import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return Response.json({ message: "Id is required" }, { status: 401 });
    }

    const discount = await db.discount.findFirst({
      where: { id },
    });

    if (!discount) {
      return Response.json(
        { message: "Discount is not find" },
        { status: 402 }
      );
    }

    await db.discount.delete({
      where: { id: discount.id },
    });

    return Response.json({ message: "Discount Code Deleted Successfully" });
  } catch (err) {
    return Response.json(
      { message: `Unknown Error In Delete Discount Code API --> ${err}` },
      { status: 500 }
    );
  }
}
