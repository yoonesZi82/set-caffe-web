import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
export async function POST(req) {
  try {
    const newTicket = await req.json();
    const { title, body, piority, userID, subdepartmentID, departmentID } =
      newTicket;

    if (
      !title ||
      !body ||
      !piority ||
      !userID ||
      !subdepartmentID ||
      !departmentID
    ) {
      return Response.json({ message: "Data is not valid" }, { status: 401 });
    }

    if (piority > 3 || piority <= 0) {
      return Response.json({ message: "piority just 1,2,3" }, { status: 402 });
    }

    await db.ticket.create({
      data: {
        title,
        body,
        piority,
        user: {
          connect: { id: userID },
        },
        department: {
          connect: { id: departmentID },
        },
        subdepartment: {
          connect: { id: subdepartmentID },
        },
      },
    });

    return Response.json({ message: "Ticket is create :))" }, { status: 201 });
  } catch (err) {
    return Response.json(
      { message: `Unknown Error In Tickets API Is --> ${err}` },
      { status: 500 }
    );
  }
}
