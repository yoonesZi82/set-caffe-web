import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { title } = body;

    if (!title) {
      return Response.json({ message: "Title is valid" }, { status: 401 });
    }

    const department = await db.department.findFirst({
      where: { title },
    });

    if (department) {
      return Response.json(
        { message: "The department already exists" },
        { status: 402 }
      );
    }
    await db.department.create({
      data: { title },
    });

    return Response.json(
      { message: "Department Is Created Successfully :))" },
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
  connectToDB();
  const departments = await DepartmentModel.find({}, "-__v");
  return Response.json({ message: "Departments --> ", departments });
}
