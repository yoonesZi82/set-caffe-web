import GlobalBtn from "@/components/global-button/GlobalBtn";
import React from "react";
import { PiHeartBold } from "react-icons/pi";

function NoUser({}) {
  return (
    <section className="flex flex-col justify-center items-center gap-3 pt-6 w-full">
      <PiHeartBold size={150} color="#4b382a" />
      <p className="text-[48px] text-navbarDashboard">
        {" "}
        شما وارد حساب خود نشدید{" "}
      </p>
      <span className="block text-sidebarTheme">
        شما میتوانید با وارد شدن به حساب خود محصولات
      </span>
      <span className="block text-sidebarTheme">
        مورد علاقه خود را مشاهده کنید
      </span>
      <GlobalBtn
        title={"ورود"}
        link={"/login-register"}
        model={1}
        iconName={"PiUserBold"}
      />
    </section>
  );
}

export default NoUser;
