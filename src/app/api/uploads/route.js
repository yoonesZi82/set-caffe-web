import path from "path";
import fs from "fs/promises";
import { existsSync, mkdirSync } from "fs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const fileAnt = formData.get("file");
    const route = formData.get("route");

    if (fileAnt) {
      if (!fileAnt.type.startsWith("image/")) {
        return Response.json("فایل بارگذاری شده از نوع عکس نیست.", {
          status: 400,
        });
      }

      const fileSize = fileAnt.size / (1024 * 1024);
      if (fileSize > 8) {
        return Response.json("عکس نباید بیش از 8 مگابایت باشد.", {
          status: 400,
        });
      }

      const arrBuffer = await fileAnt.arrayBuffer();
      const buffer = Buffer.from(arrBuffer);

      const filename = `${Date.now()}_${fileAnt.name}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", route);

      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }

      // استفاده از path.join برای ساخت مسیر فایل
      const filePath = path.join(uploadDir, filename);
      await fs.writeFile(filePath, buffer);

      return Response.json({ image: filename }, { status: 200 });
    } else {
      return Response.json("فایلی بارگذاری نشده است.", { status: 400 });
    }
  } catch (error) {
    return Response.json(`Error occurred while uploading file! ${error}`, {
      status: 500,
    });
  }
}
