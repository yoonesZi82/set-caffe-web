import { PrismaClient } from "@prisma/client";
import { generateAccessToken, generateRefreshToken } from "@/utils/auth";
const db = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { phone, code } = body;

    // Validate
    const user = await db.user.findFirst({
      where: { phone },
    });

    if (user) {
      if (user.isBan) {
        return Response.json({ message: "User is ban" }, { status: 423 });
      } else {
        const otp = await db.otp.findFirst({
          where: { phone, code },
        });
        if (otp) {
          const date = new Date();
          const now = date.getTime();
          if (Number(otp.expTime) > now) {
            const accessToken = await generateAccessToken({
              email: user.email,
            });
            const refreshToken = await generateRefreshToken({
              email: user.email,
            });

            await db.user.update({
              where: { id: user.id },
              data: {
                refreshToken,
              },
            });

            const headers = new Headers();
            headers.append(
              "Set-Cookie",
              `token=${accessToken};path=/;httpOnly=true;`
            );
            headers.append(
              "Set-Cookie",
              `refresh-token=${refreshToken};path=/;httpOnly=true;`
            );

            return Response.json(
              { message: "User Is Login Successfully" },
              {
                status: 200,
                headers,
              }
            );
          } else {
            return Response.json(
              { message: "Code Is Expired :((" },
              { status: 401 }
            );
          }
        } else {
          return Response.json(
            { message: "Code Is Not Correct !!" },
            { status: 402 }
          );
        }
      }
    }
  } catch (err) {
    return Response.json(
      { message: `Error Verify Code In API --> ${err}` },
      { status: 500 }
    );
  }
}
