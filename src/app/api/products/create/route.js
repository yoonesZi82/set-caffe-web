import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      number,
      price,
      shortDescription,
      longDescription,
      weight,
      score,
      suitableFor,
      smell,
      tags,
      img,
    } = body;

    if (!number) {
      return Response.json({ message: "number is required" }, { status: 415 });
    }

    if (!name) {
      return Response.json({ message: "Name is not find" }, { status: 401 });
    }
    if (!price) {
      return Response.json({ message: "Price is not find" }, { status: 402 });
    }
    if (!shortDescription) {
      return Response.json(
        { message: "ShortDescription is not find" },
        { status: 403 }
      );
    }
    if (!longDescription) {
      return Response.json(
        { message: "LongDescription is not find" },
        { status: 405 }
      );
    }
    if (!weight) {
      return Response.json({ message: "Weight is not find" }, { status: 406 });
    }
    if (!score) {
      return Response.json({ message: "Score is not find" }, { status: 404 });
    }
    if (!suitableFor) {
      return Response.json(
        { message: "SuitableFor is not find" },
        { status: 407 }
      );
    }
    if (!smell) {
      return Response.json({ message: "Smell is not find" }, { status: 408 });
    }
    if (!tags) {
      return Response.json({ message: "Tags is not find" }, { status: 409 });
    }
    if (!img) {
      return Response.json({ message: "Image is not find" }, { status: 410 });
    }

    const product = await db.product.findFirst({
      where: { name },
    });

    if (product) {
      return Response.json({ message: "Product is already" }, { status: 411 });
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim());

    await db.product.create({
      data: {
        name,
        price,
        shortDescription,
        longDescription,
        weight,
        suitableFor,
        smell,
        tags: tagsArray,
        score,
        number,
        img,
      },
    });

    return Response.json(
      { message: "Product created successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: `Unknown error is create product --> ${err}` },
      { status: 500 }
    );
  }
}
