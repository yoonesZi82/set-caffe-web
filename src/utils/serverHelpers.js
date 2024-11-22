import connectToDB from "@/configs/db";
import { cookies } from "next/headers";
import { verifyAccessToken } from "./auth";
import usersModel from "@/models/User";

const authAdmin = async () => {
  connectToDB();
  const token = cookies().get("token");
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = await usersModel.findOne({ email: tokenPayload.email });
      if (user.role === "ADMIN") {
        console.log(user);
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
  return user;
};

export { authAdmin };
