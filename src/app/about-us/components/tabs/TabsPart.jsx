import { Tabs } from "antd";
import React from "react";
import CollapsePart from "../collapse/CollapsePart";

function TabsPart() {
  const tabItem = [
    {
      key: 1,
      label: "درباره ما",
      children: <CollapsePart model={2} />,
    },
    {
      key: 2,
      label: "سوالات متداول",
      children: <CollapsePart model={1} />,
    },
  ];
  return <Tabs defaultActiveKey="1" centered items={tabItem} />;
}

export default TabsPart;
