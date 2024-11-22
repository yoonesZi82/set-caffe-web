import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function PUT(req) {
  try {
    const body = await req.json();
    const { code, userID } = body;

    if (!code) {
      return Response.json({ message: "Code is not valid" }, { status: 401 });
    }

    if (!userID) {
      return Response.json({ message: "User is not find" }, { status: 402 });
    }

    const discount = await db.discount.findFirst({
      where: { code },
    });

    if (!discount) {
      return Response.json(
        { message: "Can not find discount" },
        { status: 403 }
      );
    }

    if (discount.uses != discount.maxUse) {
      await db.discount.update({
        where: { id: discount.id },
        data: {
          uses: discount.uses + 1,
          user: {
            connect: { id: userID },
          },
        },
      });
    } else {
      return Response.json(
        { message: "The code has expired" },
        { status: 405 }
      );
    }
    return Response.json(discount);
  } catch (err) {
    return Response.json(
      { message: `Unknown Error in Use Discount API --> ${err}` },
      { status: 500 }
    );
  }
}
