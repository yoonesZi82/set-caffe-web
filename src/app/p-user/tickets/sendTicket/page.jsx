import DashboardLayout from "@/components/layouts/DashboardLayout";
import { checkToken } from "@/utils/checkToken";
import TicketForm from "./form/TicketFrom";

const page = async () => {
  const user = await checkToken();
  return (
    <DashboardLayout
      user={user}
      howUser={user.role === "ADMIN" ? "ADMIN" : "USER"}
    >
      <TicketForm user={user ? user : false} />
    </DashboardLayout>
  );
};

export default page;
