import DashboardLayout from "@/components/layouts/DashboardLayout";
import { checkToken } from "@/utils/checkToken";
import React from "react";
import NewProductForm from "./components/form/NewProductForm";

async function page() {
  const user = await checkToken();
  return (
    <DashboardLayout
      user={user}
      howUser={user.role === "ADMIN" ? "ADMIN" : "USER"}
    >
      <NewProductForm />
    </DashboardLayout>
  );
}

export default page;
