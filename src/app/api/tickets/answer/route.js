import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function PUT(req) {
  try {
    const reqBody = await req.json();
    const { answer, ticketID } = reqBody;

    if (!answer) {
      return Response.json({ message: "Answer is required" }, { status: 401 });
    }
    if (!ticketID) {
      return Response.json(
        { message: "TicketID is required" },
        { status: 402 }
      );
    }

    const ticket = await db.ticket.findFirst({
      where: { id: ticketID },
    });

    if (!ticket) {
      return Response.json({ message: "Ticket is not find" }, { status: 403 });
    }

    await db.ticket.update({
      where: { id: ticket.id },
      data: {
        answer,
        hasAnswer: true,
        isAnswer: true,
      },
    });

    return Response.json(
      { message: "Send answer saved successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
