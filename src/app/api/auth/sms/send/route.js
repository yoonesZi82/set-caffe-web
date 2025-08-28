import { PrismaClient } from "@prisma/client";
const request = require("request");
const db = new PrismaClient();

export async function POST(req) {
  try {
    // api sms
    const body = await req.json();
    const { phone } = body;

    // get otp code random
    const code = String(Math.floor(Math.random() * 999999));

    // get expire time
    const expTime = String(Date.now() + 1000 * 60 * 3); // 3 minuet

    const isUserExist = await db.user.findFirst({
      where: { phone },
    });

    if (!isUserExist) {
      return Response.json(
        { message: "The phone number is not already" },
        { status: 422 }
      );
    }

    // get otp code in faraz sms
    request.post(
      {
        url: "http://ippanel.com/api/select",
        body: {
          op: "pattern",
          user: "yooneszi82",
          pass: "81821010gH",
          fromNum: "3000505",
          toNum: phone,
          patternCode: "l3nra1ytqp7rkm0",
          inputData: [{ "verification-code": code }],
        },
        json: true,
      },
      async function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
          await db.otp.create({
            data: {
              phone,
              code,
              expTime,
            },
          });
        } else {
          return Response.json(
            { message: `Error Send Code In API --> ${error}` },
            { status: 499 }
          );
        }
      }
    );
    return Response.json(
      { message: "Send Code Is Successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: `Error Send Code In API --> ${err}` },
      { status: 500 }
    );
  }
}
