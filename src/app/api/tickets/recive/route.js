import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function GET() {
  try {
    const tickets = await db.ticket.findMany({});

    if (!tickets) {
      return Response.json(
        { message: "Tickets are not found" },
        { status: 401 }
      );
    }

    return Response.json(tickets);
  } catch (err) {
    return Response.json(
      { message: `Unknown error in get tickets API --> ${err}` },
      { status: 500 }
    );
  }
}
