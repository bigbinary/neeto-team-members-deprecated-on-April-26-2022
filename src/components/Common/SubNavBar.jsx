import React from "react";

import { Tab } from "@bigbinary/neetoui";

const SubNavBar = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <Tab className="mb-2">
      {tabs.map((tab, index) => (
        <Tab.Item
          key={index}
          onClick={() => setActiveTab(tab.value)}
          icon={tab.icon}
          active={tab.value === activeTab}
        >
          {tab.label}
        </Tab.Item>
      ))}
    </Tab>
  );
};

export default SubNavBar;
