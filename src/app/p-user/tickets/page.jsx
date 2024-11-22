import { checkToken } from "@/utils/checkToken";
import TicketsTable from "./components/table/TicketsTable";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const page = async () => {
  const user = await checkToken();
  return (
    <DashboardLayout
      user={user}
      howUser={user.role === "ADMIN" ? "ADMIN" : "USER"}
    >
      <TicketsTable tickets={user.ticket} />
    </DashboardLayout>
  );
};

export default page;
