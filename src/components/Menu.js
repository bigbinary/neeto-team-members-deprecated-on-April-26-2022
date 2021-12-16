import React from "react";

import { MenuBar } from "@bigbinary/neetoui";
import { keys } from "ramda";

import { MEMBER_FILTER } from "../constants";

const Menu = ({
  showMenu,
  metaName,
  filterCounts,
  selectedMemberStatusFilter,
  setSelectedMemberStatusFilter,
}) => {
  const MEMBER_FILTER_KEYS = keys(MEMBER_FILTER);
  return (
    <MenuBar showMenu={showMenu} title={`${metaName}s`}>
      {MEMBER_FILTER_KEYS.map((filter) => (
        <MenuBar.Block
          count={filterCounts[filter]}
          key={filter}
          label={MEMBER_FILTER[filter].label}
          active={
            MEMBER_FILTER_KEYS.includes(selectedMemberStatusFilter) &&
            filter === selectedMemberStatusFilter
          }
          onClick={() => setSelectedMemberStatusFilter(filter)}
        />
      ))}
    </MenuBar>
  );
};

export default Menu;
