import React from "react";
import * as Icons from "react-icons/pi";
const Box = ({ title, value, iconName }) => {
  const Icon = Icons[iconName];

  return (
    <div className="flex flex-col gap-1 border-2 border-navbarDashboard hover:bg-navbarDashboard p-[14px] rounded-[8px] w-full transition-all duration-500 group">
      <p className="text-right text-sidebarTheme text-xm">{value}</p>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center gap-2">
          <p className="group-hover:text-sidebarTheme text-navbarDashboard">
            {title}
          </p>
          <div>{Icon && <Icon size={30} color="#d2b48c" />}</div>
        </div>
        <div className="flex flex-col justify-start items-start gap-1 w-full">
          <hr className="border-2 border-sidebarTheme rounded-[8px] w-[55%]" />
          <hr className="border-2 border-sidebarTheme rounded-[8px] w-[35%]" />
        </div>
      </div>
    </div>
  );
};

export default Box;
