import DashboardLayout from "@/components/layouts/DashboardLayout";
import { checkToken } from "@/utils/checkToken";
import React from "react";
import DiscountForm from "./components/form/DiscountForm";

async function page() {
  const user = await checkToken();
  return (
    <DashboardLayout
      user={user}
      howUser={user.role === "ADMIN" ? "ADMIN" : "USER"}
    >
      <DiscountForm />
    </DashboardLayout>
  );
}

export default page;
