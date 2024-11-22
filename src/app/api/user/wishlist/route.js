import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { userID } = body;

    if (!userID) {
      return Response.json({ message: "UserID is required" }, { status: 401 });
    }

    const user = await db.user.findFirst({
      where: { id: userID },
    });
    if (!user) {
      return Response.json({ message: "User is not found" }, { status: 402 });
    }

    const wishlist = await db.user.findFirst({
      where: { id: user.id },
      select: {
        wishlist: {
          include: true,
        },
      },
    });

    if (wishlist.wishlist.length === 0) {
      return Response.json(
        { message: "User not have a wishlist" },
        { status: 403 }
      );
    }

    return Response.json(wishlist.wishlist);
  } catch (err) {
    return Response.json(
      { message: `Wishlist error for recive API --> ${err}` },
      { status: 500 }
    );
  }
}
