import HomeLayout from "@/components/layouts/HomeLayout";
import CreateSoon from "@/components/soon-page/CreateSoon";
import { checkToken } from "@/utils/checkToken";
import React from "react";

async function page() {
  const user = await checkToken();
  return (
    <HomeLayout isLogin={user ? user : false}>
      <CreateSoon />
    </HomeLayout>
  );
}

export default page;
