import { cookies } from "next/headers";
import { verifyAccessToken } from "./auth";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
export async function checkToken() {
  try {
    const token = cookies().get("token");

    if (!token) {
      return false;
    }
    const tokenPayload = verifyAccessToken(token.value);
    if (!tokenPayload) {
      return false;
    }
    const user = await db.user.findFirst({
      where: { email: tokenPayload.email },
      include: {
        comment: {
          orderBy: { createdAt: "desc" },
          include: {
            product: true,
          },
        },
        ticket: {
          orderBy: { createdAt: "desc" },
          include: {
            department: {
              include: {
                subdepartment: true,
              },
            },
            subdepartment: true,
          },
        },
        wishlist: {
          orderBy: { createdAt: "desc" },
          include: {
            product: true,
          },
        },
        contact: true,
        order: true,
      },
    });
    if (!user) {
      return false;
    }
    return user;
  } catch (err) {
    return false;
  }
}
