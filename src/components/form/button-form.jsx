import React from "react";
import { Button } from "antd";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import * as Icons from "react-icons/pi";

function ButtonForm({ loading, title, iconName, disable }) {
  const Icon = Icons[iconName];
  return (
    <Button
      className="flex flex-row-reverse justify-center items-center bg-sidebarTheme hover:bg-navbarDashboard px-5 py-5 border-none rounded-[4px] w-full text-[18px] text-navbarDashboard hover:text-sidebarTheme text-center leading-[18px] transition-colors duration-500 cursor-pointer"
      htmlType="submit"
      icon={Icon ? <Icon size={20} /> : <PiPaperPlaneTiltBold size={20} />}
      loading={loading}
      disabled={disable}
    >
      {title}
    </Button>
  );
}

export default ButtonForm;
