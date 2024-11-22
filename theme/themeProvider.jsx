import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import Fa from "antd/locale/fa_IR";
import React from "react";

const ThemeProvider = ({ children }) => {
  return (
    <ConfigProvider
      direction="rtl"
      locale={Fa}
      theme={{
        components: {
          Menu: {
            iconSize: 16,
            itemColor: "#4b382a",
            itemHoverColor: "#4b382a",
            horizontalItemSelectedColor: "#4b382a",
            itemSelectedBg: "rgba(0, 0, 0, 0.1)",
            itemSelectedColor: "#4b382a",
            darkItemBg: "#4b382a",
            fontSize: 16,
          },
          Statistic: {
            contentFontSize: 16,
            titleFontSize: 12,
          },
          Input: {
            fontSize: 16,
          },
          Pagination: {
            itemBg: "#d2b48c",
            itemActiveBg: "#4b382a",
          },
          Collapse: {
            contentBg: "#d2b48c",
            headerBg: "#d1b18a",
          },
          Table: {
            headerBg: "#d2b48c",
            headerColor: "#4b382a",
            rowHoverBg: "#4b382a",
          },
        },
        token: {
          colorPrimary: "#34180e",
          colorError: "#ff4d4f",
          colorErrorHover: "#ff7875",
          colorInfo: "#1677ff",
          colorSuccess: "#52c41a",
          fontFamily: "var(--font-vazir)",
        },
      }}
    >
      <AntdRegistry>{children}</AntdRegistry>
    </ConfigProvider>
  );
};

export default ThemeProvider;
