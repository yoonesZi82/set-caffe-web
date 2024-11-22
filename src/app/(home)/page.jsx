import React from "react";
import Banner from "./components/banner/Banner";
import Latest from "@/components/latest/Latest";
import Promote from "./components/promote/Promote";
import ShowOffice from "./components/office/ShowOffice";
import HomeLayout from "@/components/layouts/HomeLayout";
import { checkToken } from "@/utils/checkToken";

export default async function Home() {
  const user = await checkToken();

  return (
    <HomeLayout
      isLogin={user ? user : false}
      wishlistNumber={user ? user.wishlist.length : 0}
    >
      <Banner />
      <Latest count={8} pagination={false} id={user ? user.id : null} />
      <Promote />
      <ShowOffice />
    </HomeLayout>
  );
}
