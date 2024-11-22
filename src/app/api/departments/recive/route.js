import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function GET(req) {
  try {
    const departments = await db.department.findMany({});

    if (!departments) {
      return Response.json(
        { message: "Departments are not found" },
        { status: 40 }
      );
    }

    return Response.json(departments);
  } catch (err) {
    return Response.json(
      { message: `Unknown error in get departments API --> ${err}` },
      { status: 500 }
    );
  }
}
