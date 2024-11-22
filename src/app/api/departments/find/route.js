import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { departmentID } = body;

    if (!departmentID) {
      return Response.json(
        { message: "DepartmentID is not found" },
        { status: 401 }
      );
    }

    const department = await db.department.findFirst({
      where: { id: departmentID },
    });

    if (!department) {
      return Response.json(
        {
          message: "Department is not found",
        },
        { status: 402 }
      );
    }

    return Response.json(department);
  } catch (err) {
    return Response.json(
      { message: `Unknown error to find department API --> ${err}` },
      { status: 500 }
    );
  }
}
