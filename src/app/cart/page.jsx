import HomeLayout from "@/components/layouts/HomeLayout";
import Breadcrumb from "@/components/breadcrump/Breadcrump";
import { checkToken } from "@/utils/checkToken";
import StepPage from "./components/step-page/StepPage";

const page = async () => {
  const user = await checkToken();
  return (
    <HomeLayout isLogin={user ? user : false}>
      <Breadcrumb route={"سبد خرید"} />
      <StepPage user={user ? user : false} />
    </HomeLayout>
  );
};

export default page;
