import path from "path";
import { existsSync, unlinkSync } from "fs";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { image, userID, route } = body;

    if (userID) {
      const directory = path.join(
        process.cwd(),
        `public/uploads/${route}/`,
        image
      );

      if (!existsSync(directory)) {
        return Response.json("فایل مورد نظر یافت نشد!", { status: 400 });
      }

      await unlinkSync(directory);

      const user = await db.user.findFirst({
        where: { id: userID },
      });

      if (!user) {
        return Response.json({ message: "User in not found" }, { status: 401 });
      }

      await db.user.update({
        where: { id: user.id },
        data: {
          image: null,
        },
      });

      return Response.json("File deleted!", { status: 200 });
    } else {
      if (!image) {
        return new Response("نام فایل ارسال نشده است.", { status: 400 });
      }

      const filePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        route,
        image
      );

      if (!existsSync(filePath)) {
        return new Response("فایل مورد نظر یافت نشد.", { status: 404 });
      }

      await unlinkSync(filePath);

      return new Response("فایل با موفقیت حذف شد.", { status: 200 });
    }
  } catch (error) {
    return Response.json(`Error occurred while deleting file! ${error}`, {
      status: 500,
    });
  }
}
