import Box from "@/components/detail-box/box/Box";
import Tickets from "./components/detail-box/tickets/Tickets";
import Orders from "./components/detail-box/orders/Orders";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { checkToken } from "@/utils/checkToken";
import { redirect } from "next/navigation";

const UserPanel = async () => {
  const user = await checkToken();

  return (
    <>
      {!user ? (
        redirect("/login-register")
      ) : (
        <DashboardLayout
          user={user}
          howUser={user.role === "ADMIN" ? "ADMIN" : "USER"}
        >
          <div className="flex flex-col gap-10 h-full">
            <section className="gap-6 grid grid-cols-1 desktop:grid-cols-4 laptop:grid-cols-4 mobile:grid-cols-1 tablet:grid-cols-2">
              <Box
                title="مجموع تیکت ها "
                value={user ? user.ticket.length : 0}
                iconName="PiChatTextBold"
              />
              <Box
                title="مجموع کامنت ها "
                value={user ? user.comment.length : 0}
                iconName="PiChatCircleTextBold"
              />
              <Box
                title="مجموع سفارشات"
                value={user ? user.order.length : 0}
                iconName="PiBasketBold"
              />
              <Box
                title="مجموع علاقه مندی ها"
                value={user ? user.wishlist.length : 0}
                iconName="PiHeartBold"
              />
            </section>
            <section className="gap-6 grid grid-cols-1 desktop:grid-cols-2 laptop:grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1 pb-10 h-full">
              <Tickets tickets={user ? user.ticket.slice(0, 3) : []} />
              <Orders />
            </section>
          </div>
        </DashboardLayout>
      )}
    </>
  );
};

export default UserPanel;
