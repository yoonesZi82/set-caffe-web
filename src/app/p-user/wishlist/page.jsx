import { checkToken } from "@/utils/checkToken";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import WishlistTable from "./components/table/WishlistTable";

const Page = async () => {
  const user = await checkToken();

  return (
    <DashboardLayout
      user={user}
      howUser={user.role === "ADMIN" ? "ADMIN" : "USER"}
    >
      <main
        className={
          user.wishlist.length === 0
            ? "w-full h-full flex justify-center items-center"
            : ""
        }
      >
        {user.wishlist ? (
          <section className="overflow-x-auto">
            <WishlistTable wishlists={user.wishlist} user={user} />
          </section>
        ) : (
          <section>
            <p className="text-navbarDashboard text-xl">محصولی وجود ندارد</p>
          </section>
        )}
      </main>
    </DashboardLayout>
  );
};

export default Page;
