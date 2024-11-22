import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { departmentID } = body;
    if (!departmentID) {
      return Response.json({ message: "Data is not valid" }, { status: 401 });
    }
    const subDepartments = await db.subdepartment.findMany({
      where: {
        departmentID,
      },
    });
    return Response.json(subDepartments);
  } catch (err) {
    console.log(err);

    return Response.json(
      { message: `Unknown Error In Sub Ticket API Is --> ${err}` },
      { status: 500 }
    );
  }
}
