import DashboardLayout from "@/components/layouts/DashboardLayout";
import { checkToken } from "@/utils/checkToken";
import React from "react";

async function page() {
  const user = await checkToken();
  return (
    <DashboardLayout
      user={user}
      howUser={user.role === "ADMIN" ? "ADMIN" : "USER"}
    >
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-navbarDashboard text-xl"> صفحه در دست ساخت است </p>
      </div>
    </DashboardLayout>
  );
}

export default page;
