import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function PUT(req) {
  try {
  } catch (err) {
    return Response.json(
      { message: `Unknown error in update phone API --> ${err}` },
      { status: 401 }
    );
  }
}
