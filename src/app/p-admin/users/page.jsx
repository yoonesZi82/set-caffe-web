import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { checkToken } from "@/utils/checkToken";
import { PrismaClient } from "@prisma/client";
import UsersTable from "./components/table/UsersTable";

const page = async () => {
  const user = await checkToken();
  const db = new PrismaClient();
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      comment: true,
      contact: true,
      order: true,
      ticket: true,
      wishlist: true,
    },
  });
  return (
    <DashboardLayout
      user={user}
      howUser={user.role === "ADMIN" ? "ADMIN" : "USER"}
    >
      <UsersTable users={users} />
    </DashboardLayout>
  );
};

export default page;
