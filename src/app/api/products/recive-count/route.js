import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { count } = body;

    if (!count) {
      const products = await db.product.findMany({
        orderBy: {
          id: "desc",
        },
        include: {
          comment: true,
          wishlist: true,
        },
      });
      if (!products) {
        return Response.json(
          { message: "Products are not found" },
          { status: 402 }
        );
      }

      return Response.json(products);
    }

    const products = await db.product.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        comment: true,
        wishlist: true,
      },
      take: count,
    });

    if (!products) {
      return Response.json(
        { message: "Products are not found" },
        { status: 402 }
      );
    }

    return Response.json(products);
  } catch (err) {
    return Response.json(
      { message: `Unknown error in get count products API --> ${err}` },
      { status: 500 }
    );
  }
}
