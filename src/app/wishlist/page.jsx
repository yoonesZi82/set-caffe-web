import Breadcrumb from "@/components/breadcrump/Breadcrump";
import { checkToken } from "@/utils/checkToken";
import HomeLayout from "@/components/layouts/HomeLayout";
import NoUser from "./components/no-user/NoUser";
import Latest from "@/components/latest/Latest";

const page = async () => {
  const user = await checkToken();

  return (
    <HomeLayout isLogin={user ? user : false}>
      <Breadcrumb route={"علاقه مندی ها"} />
      <div className="w-full" data-aos="fade-up">
        {!user ? (
          <NoUser />
        ) : (
          <Latest pagination={true} id={user.id} wishlist={true} user={user} />
        )}
      </div>
    </HomeLayout>
  );
};

export default page;
