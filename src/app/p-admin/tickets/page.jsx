import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { checkToken } from "@/utils/checkToken";
import { PrismaClient } from "@prisma/client";
import TicketsTable from "./components/table/TicketsTable";

const page = async () => {
  const db = new PrismaClient();
  const user = await checkToken();
  const tickets = await db.ticket.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      department: true,
      subdepartment: true,
      user: true,
    },
  });
  return (
    <DashboardLayout
      user={user}
      howUser={user.role === "ADMIN" ? "ADMIN" : "USER"}
    >
      <TicketsTable tickets={tickets} />
    </DashboardLayout>
  );
};

export default page;
