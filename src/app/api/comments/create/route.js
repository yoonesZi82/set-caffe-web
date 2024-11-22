import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const newComment = await req.json();
    const { username, body, email, score, productID, userID } = newComment;

    if (!username.trim() || !body.trim() || !email.trim()) {
      return Response.json({ message: "Data Is Not Valid" }, { status: 403 });
    }

    await db.comment.create({
      data: {
        username,
        body,
        email,
        score,
        user: {
          connect: { id: userID },
        },
        product: {
          connect: { id: productID },
        },
      },
    });

    return Response.json(
      {
        message: "Comment created successfully :))",
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return Response.json({ message: `error is --> ${err}` }, { status: 500 });
  }
}
