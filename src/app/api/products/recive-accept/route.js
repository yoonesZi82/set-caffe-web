import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { productID } = body;

    if (!productID) {
      return Response.json(
        { message: "ProductID is required" },
        { status: 401 }
      );
    }

    const product = await db.product.findFirst({
      where: { id: productID },
      include: {
        comment: {
          orderBy: {
            id: "desc",
          },
          where: { isAccept: true },
          include: {
            user: {
              select: {
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        wishlist: true,
      },
    });

    if (!product) {
      return Response.json(
        { message: "Product is not found" },
        { status: 402 }
      );
    }

    return Response.json(product);
  } catch (err) {
    console.log(err);

    return Response.json(
      { message: `Unknown error in get products API --> ${err}` },
      { status: 500 }
    );
  }
}
