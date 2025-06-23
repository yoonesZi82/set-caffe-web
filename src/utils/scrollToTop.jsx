"use client";
import { FloatButton } from "antd";
import { PiArrowFatLinesUpFill } from "react-icons/pi";

const ScrollToTop = () => {
  return (
    <FloatButton.BackTop
      icon={<PiArrowFatLinesUpFill size={20} />}
      className="hover:bg-navbarDashboard [&_svg]:hover:!text-sidebarTheme transition-colors duration-500"
    />
  );
};

export default ScrollToTop;
