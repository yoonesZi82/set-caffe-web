import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { userID } = body;

    if (!userID) {
      return Response.json({ message: "User ID Is Required" }, { status: 401 });
    }

    const user = await db.user.findFirst({
      where: { id: userID },
      include: {
        wishlist: {
          orderBy: { createdAt: "desc" },
          include: { product: true },
        },
      },
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 402 });
    }

    return Response.json(user.wishlist);
  } catch (err) {
    return Response.json(
      { message: `Wishlist error for recive API --> ${err}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const wish = await db.wishlist.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            image: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            shortDescription: true,
            longDescription: true,
            weight: true,
            smell: true,
            suitableFor: true,
            score: true,
            tags: true,
            img: true,
          },
        },
      },
    });

    if (!wish) {
      return Response.json(
        { message: "Wishlists dose not exist" },
        { status: 401 }
      );
    }

    return Response.json(wish);
  } catch (err) {
    return Response.json(
      { message: `Wishlist error for recive API --> ${err}` },
      { status: 500 }
    );
  }
}
