import React from "react";
import { PrismaClient } from "@prisma/client";
import { checkToken } from "@/utils/checkToken";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DiscountTable from "./table/DiscountTable";
const page = async () => {
  const db = new PrismaClient();
  const user = await checkToken();
  const discounts = await db.discount.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <DashboardLayout
      user={user}
      howUser={user.role === "ADMIN" ? "ADMIN" : "USER"}
    >
      <DiscountTable discounts={discounts ? discounts : null} />
    </DashboardLayout>
  );
};

export default page;
