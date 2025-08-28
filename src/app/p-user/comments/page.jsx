import React from "react";
import CommentsTable from "./components/table/CommentsTable";
import { checkToken } from "@/utils/checkToken";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await checkToken();

  if (!user) {
    redirect("/login-register");
  }

  return (
    <DashboardLayout
      user={user}
      howUser={user.role === "ADMIN" ? "ADMIN" : "USER"}
    >
      <main
        className={
          user.comment.length === 0
            ? "w-full h-full flex justify-center items-center"
            : ""
        }
      >
        {user.comment && user.comment.length > 0 ? (
          <section className="overflow-x-auto">
            <CommentsTable comments={user.comment || []} />
          </section>
        ) : (
          <section>
            <p className="text-navbarDashboard text-xl">کامنتی وجود ندارد</p>
          </section>
        )}
      </main>
    </DashboardLayout>
  );
};

export default Page;
