import GlobalBtn from "@/components/global-button/GlobalBtn";
import HomeLayout from "@/components/layouts/HomeLayout";
import { checkToken } from "@/utils/checkToken";
import { Result } from "antd";

const page = async () => {
  const user = await checkToken();
  return (
    <HomeLayout isLogin={user ? true : false}>
      <div className="flex justify-center items-center w-full h-full">
        <Result
          status="404"
          title="404"
          subTitle="صفحه ای که دنبالش میگردی اینجاس نیست."
          extra={
            <div className="flex flex-col justify-center items-center gap-2">
              <h1 className="text-navbarDashboard">
                صفحه مورد نظر بافت نشد 😔
              </h1>
              <GlobalBtn
                title={"برگشت به صفحه اصلی"}
                link={"/"}
                iconName={"PiHouseLineBold"}
                model={1}
              />
            </div>
          }
        />
      </div>
    </HomeLayout>
  );
};

export default page;
