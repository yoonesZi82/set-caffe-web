import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { checkToken } from "@/utils/checkToken";
import { PrismaClient } from "@prisma/client";
import ProductsTable from "./components/table/ProductsTable";

const page = async () => {
  const user = await checkToken();
  const db = new PrismaClient();
  const products = await db.product.findMany({
    orderBy: { id: "desc" },
    include: {
      comment: true,
    },
  });
  return (
    <DashboardLayout
      user={user}
      howUser={user.role === "ADMIN" ? "ADMIN" : "USER"}
    >
      <ProductsTable products={products} />
    </DashboardLayout>
  );
};

export default page;
