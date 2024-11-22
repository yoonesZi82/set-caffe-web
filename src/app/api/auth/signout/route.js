import { cookies } from "next/headers";

export async function POST(req) {
  try {
    cookies().delete("token");
    return Response.json({ message: "User Is Logout :((" });
  } catch (err) {
    return Response.json(
      { message: `SignOut Error Is --> ${err}` },
      { status: 500 }
    );
  }
}
