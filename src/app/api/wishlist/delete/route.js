import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function DELETE(req) {
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
    if (!wish) {
      return Response.json({ message: "Product is not like" }, { status: 406 });
    }

    await db.wishlist.delete({
      where: { id: wish.id },
    });

    return Response.json({ message: "Product delete from wishlist" });
  } catch (err) {
    console.log(err);

    return Response.json(
      {
        message: `Unknown error in delete product from wishlist API --> ${err}`,
      },
      { status: 500 }
    );
  }
}
