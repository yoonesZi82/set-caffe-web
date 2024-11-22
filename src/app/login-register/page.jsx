import { checkToken } from "@/utils/checkToken";
import { redirect } from "next/navigation";
import ShowPage from "./components/show-page/ShowPage";

const page = async () => {
  const user = await checkToken();
  return (
    <>
      {user && user.role === "ADMIN" ? (
        redirect("/p-admin")
      ) : user && user.role === "USER" ? (
        redirect("/p-user")
      ) : (
        <ShowPage />
      )}
    </>
  );
};

export default page;
