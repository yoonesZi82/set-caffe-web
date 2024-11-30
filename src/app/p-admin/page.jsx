import React from "react";
import Box from "@/components/detail-box/box/Box";
import { checkToken } from "@/utils/checkToken";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SaleChart from "./components/chart/SaleChart";
import GrowthRateChart from "./components/chart/GrowthRateChart";

async function AdminHomePage() {
  const db = new PrismaClient();
  const user = await checkToken();
  const products = await db.product.findMany({});
  const users = await db.user.findMany({});
  const orders = await db.order.findMany({});
  const tickets = await db.ticket.findMany({});

  return (
    <>
      {user.role === "USER" ? (
        redirect("/p-user")
      ) : !user ? (
        redirect("/login-register")
      ) : (
        <DashboardLayout user={user} howUser={"ADMIN"}>
          <main className="flex flex-col gap-8 h-full">
            <section className="gap-6 grid grid-cols-1 desktop:grid-cols-4 laptop:grid-cols-4 mobile:grid-cols-1 tablet:grid-cols-2">
              <Box
                title="مجموع تیکت های دریافتی "
                value={tickets ? tickets.length : 0}
                iconName="PiChatTextBold"
              />
              <Box
                title="مجموع محصولات "
                value={products ? products.length : 0}
                iconName="PiCoffeeBeanBold"
              />
              <Box
                title="مجموع سفارشات "
                value={orders ? orders.length : 0}
                iconName="PiBasketBold"
              />
              <Box
                title="مجموع کاربر های سایت "
                value={users ? users.length : 0}
                iconName="PiUserBold"
              />
            </section>{" "}
            <div className="flex justify-between items-center gap-10 w-full h-full">
              <section className="flex justify-center items-center rounded-[8px] w-full h-full">
                <SaleChart />
              </section>
              <section className="flex justify-center items-center rounded-[8px] w-full h-full">
                <GrowthRateChart />
              </section>
            </div>
          </main>
        </DashboardLayout>
      )}
    </>
  );
}

export default AdminHomePage;
