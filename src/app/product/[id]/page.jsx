import HomeLayout from "@/components/layouts/HomeLayout";
import { checkToken } from "@/utils/checkToken";
import Detail from "./components/product/detail/Detail";

const product = async ({ params }) => {
  const id = Number(params.id);
  const user = await checkToken();

  return (
    <HomeLayout isLogin={user ? user : false}>
      <Detail id={id} user={user} />
    </HomeLayout>
  );
};

export default product;
