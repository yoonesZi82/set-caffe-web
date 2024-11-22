import Breadcrumb from "@/components/breadcrump/Breadcrump";
import HomeLayout from "@/components/layouts/HomeLayout";
import { checkToken } from "@/utils/checkToken";
import TabsPart from "./components/tabs/TabsPart";

const page = async () => {
  const user = await checkToken();
  return (
    <HomeLayout isLogin={user ? user : false} wishlistNumber={5}>
      <Breadcrumb route={"درباره ما"} />
      <div
        data-aos="fade-up"
        className="desktop:px-[163px] laptop:px-[163px] px-6 mobile:px-6 tablet:px-6 pb-[50px]"
      >
        <div className="w-full">
          <TabsPart />
        </div>
      </div>
    </HomeLayout>
  );
};

export default page;
