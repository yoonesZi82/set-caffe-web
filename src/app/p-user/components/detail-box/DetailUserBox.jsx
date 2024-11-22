import { Button } from "antd";
import Link from "next/link";
import React from "react";
import { PiArrowLeftBold } from "react-icons/pi";

function DetailUserBox({ children, titleButton, title }) {
  return (
    <div className="flex flex-col bg-sidebarTheme rounded-[8px] w-full h-full overflow-auto">
      <div className="flex justify-between items-center p-5 w-full">
        <p className="text-base text-navbarDashboard">{title}</p>
        <Link href="/p-user/tickets">
          <Button
            className="flex flex-row-reverse bg-sidebarTheme hover:bg-navbarDashboard border-none text-navbarDashboard hover:text-sidebarTheme transition-colors duration-500 outline-none"
            icon={<PiArrowLeftBold size={20} />}
          >
            {titleButton}
          </Button>
        </Link>
      </div>
      <div className="flex justify-center items-center bg-sidebarTheme w-full">
        <hr className="border-2 border-b-navbarDashboard rounded-[8px] w-[95%]" />
      </div>
      {children}
    </div>
  );
}

export default DetailUserBox;
