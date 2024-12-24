import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function DELETE(req) {
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
    });

    if (!product) {
      return Response.json(
        { message: "Product is not found" },
        { status: 402 }
      );
    }
    const directory = path.join(
      process.cwd(),
      "public/uploads/product",
      product.img.split("/").pop()
    );
    console.log(directory);

    if (!existsSync(directory)) {
      return Response.json(
        { message: "فایل مورد نظر یافت نشد!" },
        { status: 403 }
      );
    }

    await fs.unlink(directory);

    await db.product.delete({
      where: { id: product.id },
    });

    return Response.json({ message: "Product is deleted" });
  } catch (err) {
    return Response.json(
      { message: `Unknown error in delete product API --> ${err}` },
      { status: 500 }
    );
  }
}
