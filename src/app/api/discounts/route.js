import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { code, percent, maxUse, userID } = body;

    if (!code || !percent || !maxUse) {
      return Response.json({ message: "Data is not valid" }, { status: 401 });
    }

    if (!userID) {
      return Response.json({ message: "User not find" }, { status: 402 });
    }

    await db.discount.create({
      data: {
        code,
        percent,
        maxUse,
        user: {
          connect: { id: userID },
        },
      },
    });

    return Response.json(
      { message: "Discount Code Create Successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);

    return Response.json(
      { message: `Unknown Error In Discounts API --> ${err}` },
      { status: 500 }
    );
  }
}
