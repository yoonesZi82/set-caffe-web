import DashboardLayout from "@/components/layouts/DashboardLayout";
import { checkToken } from "@/utils/checkToken";
import DetailForm from "./from/DetailForm";

const page = async () => {
  const user = await checkToken();
  return (
    <DashboardLayout
      user={user}
      howUser={user.role === "ADMIN" ? "ADMIN" : "USER"}
    >
      <DetailForm user={user} />
    </DashboardLayout>
  );
};

export default page;
