import { checkToken } from "@/utils/checkToken";

export async function GET() {
  try {
    const user = await checkToken();

    if (!user) {
      return Response.json({ message: "User is not login" }, { status: 401 });
    }
    return Response.json(user);
  } catch (err) {
    return Response.json(
      { message: `Error Me API Is --> ${err}` },
      { status: 500 }
    );
  }
}
