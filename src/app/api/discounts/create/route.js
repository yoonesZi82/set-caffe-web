import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { code, percent, maxUse, access } = body;

    if (!code || !percent || !maxUse || !access) {
      return Response.json({ message: "Data is not valid" }, { status: 401 });
    }

    const localDiscount = await db.discount.findFirst({
      where: { access: 1 },
    });

    const privateDiscount = await db.discount.findFirst({
      where: { code },
    });

    if (access === 1) {
      if (localDiscount) {
        return Response.json(
          { message: "Local discount Code Already Exists" },
          { status: 402 }
        );
      } else {
        await db.discount.create({
          data: {
            code,
            percent,
            maxUse,
            access,
          },
        });
        return Response.json(
          { message: "Local Discount code create successfully :))" },
          { status: 201 }
        );
      }
    } else {
      if (privateDiscount) {
        return Response.json(
          { message: "Private discount Code Already Exists" },
          { status: 403 }
        );
      } else {
        await db.discount.create({
          data: {
            code,
            percent,
            maxUse,
            access,
          },
        });
        return Response.json(
          { message: "Private Discount code create successfully :))" },
          { status: 201 }
        );
      }
    }
  } catch (err) {
    return Response.json(
      { message: `Unknown Error In Discounts API --> ${err}` },
      { status: 500 }
    );
  }
}
