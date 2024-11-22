import { writeFile } from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function PUT(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const price = Number(formData.get("price"));
    const shortDescription = formData.get("shortDescription");
    const longDescription = formData.get("longDescription");
    const weight = Number(formData.get("weight"));
    const score = Number(formData.get("score"));
    const suitableFor = formData.get("suitableFor");
    const smell = formData.get("smell");
    const tags = Array(formData.get("tags"));
    const id = Number(formData.get("id"));
    const img = formData.get("img");

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
      return Response.json({ message: "Score is not find" }, { status: 406 });
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
    if (!id) {
      return Response.json({ message: "Id is not find" }, { status: 411 });
    }

    const buffer = Buffer.from(await img.arrayBuffer());
    const fileName = Date.now() + img.name;
    const imgPath = path.join(process.cwd() + "/public/uploads/" + fileName);

    await writeFile(imgPath, buffer);

    const product = await db.product.findFirst({
      where: { id },
    });

    if (!product) {
      return Response.json({ message: "Product is not find" }, { status: 412 });
    }
    await db.product.update({
      where: { id: product.id },
      data: {
        name,
        price,
        shortDescription,
        longDescription,
        weight,
        suitableFor,
        smell,
        tags,
        score,
        img: `http://localhost:3000/uploads/${fileName}`,
      },
    });

    return Response.json({ message: "Product is update successfully :))" });
  } catch (err) {
    return Response.json(
      {
        message: `The Error Upload File In Uploads File --> ${err.message}`,
      },
      { status: 500 }
    );
  }
}
