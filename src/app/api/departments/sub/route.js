import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, departmentID } = body;

    if (!title || !departmentID) {
      return Response.json({ message: "Data is not valid" }, { status: 401 });
    }

    const department = await db.department.findFirst({
      where: { id: departmentID },
    });

    if (!department) {
      return Response.json(
        { message: "There is no department" },
        { status: 402 }
      );
    }

    await db.subdepartment.create({
      data: {
        title,
        department: {
          connect: { id: department.id },
        },
      },
    });

    return Response.json(
      { message: "SubDepartment Is Created Successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: `Unknown Error In Department API Is --> ${err}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  const SubDepartment = await SubDepartmentModel.find({}, "-__v").populate(
    "department",
    "-__v"
  );
  return Response.json({ message: "SubDepartments --> ", SubDepartment });
}
