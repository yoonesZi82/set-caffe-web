import HomeLayout from "@/components/layouts/HomeLayout";
import { checkToken } from "@/utils/checkToken";
import React from "react";
import ShowProducts from "./components/show-products/ShowProducts";
import Breadcrumb from "@/components/breadcrump/Breadcrump";

async function page() {
  const user = await checkToken();
  return (
    <HomeLayout isLogin={user ? user : false}>
      <Breadcrumb route={"فروشگاه"} />
      <ShowProducts user={user} />
    </HomeLayout>
  );
}

export default page;
