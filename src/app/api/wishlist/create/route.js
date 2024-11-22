import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { userID, productID } = body;

    if (!userID) {
      return Response.json({ message: "UserID is required" }, { status: 401 });
    }
    if (!productID) {
      return Response.json(
        { message: "ProductID is required" },
        { status: 402 }
      );
    }

    const user = await db.user.findFirst({
      where: { id: userID },
    });
    if (!user) {
      return Response.json({ message: "User is not found" }, { status: 403 });
    }

    const product = await db.product.findFirst({
      where: { id: productID },
    });
    if (!product) {
      return Response.json(
        { message: "Product is not found" },
        { status: 405 }
      );
    }

    const wish = await db.wishlist.findFirst({
      where: {
        AND: [{ userID: user.id }, { productID: product.id }],
      },
    });
    if (wish) {
      return Response.json(
        { message: "Product is liked past days" },
        { status: 406 }
      );
    }

    await db.wishlist.create({
      data: {
        user: {
          connect: { id: user.id },
        },
        product: {
          connect: { id: product.id },
        },
      },
    });

    return Response.json(
      { message: "Product is like successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: `Wishlist Error API Is --> ${err}` },
      { status: 500 }
    );
  }
}