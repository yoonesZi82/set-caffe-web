import React from "react";
import { PrismaClient } from "@prisma/client";
import CommentsTable from "./components/table/CommentsTable";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { checkToken } from "@/utils/checkToken";
const page = async () => {
  const user = await checkToken();
  const db = new PrismaClient();
  const comments = await db.comment.findMany({
    orderBy: { id: "desc" },
    include: {
      user: true,
      product: true,
    },
  });
  return (
    <DashboardLayout
      user={user}
      howUser={user.role === "ADMIN" ? "ADMIN" : "USER"}
    >
      <main>
        {!comments ? (
          <div className="flex justify-center items-center w-full h-full">
            <p className="text-navbarDashboard text-xl">کامنی وجود ندارد</p>
          </div>
        ) : (
          <CommentsTable comments={comments} user={user} />
        )}
      </main>
    </DashboardLayout>
  );
};

export default page;
