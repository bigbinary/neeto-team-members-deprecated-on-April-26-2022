import React from "react";

import { Avatar, Dropdown, Typography, Tag } from "@bigbinary/neetoui";
import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { sortWith, descend, prop } from "ramda";
import classnames from "classnames";

import { MEMBER_FILTER } from "./constants";

export const getFilteredMembers = (teamMembers, filterValue, searchTerm) => {
  let filterMembers = [];
  switch (filterValue) {
    case MEMBER_FILTER.ACTIVE.value:
      filterMembers = teamMembers.filter((member) => member.active);
      break;
    case MEMBER_FILTER.INACTIVE.value:
      filterMembers = teamMembers.filter((member) => !member.active);
      break;
    default:
      filterMembers = sortWith([descend(prop("active"))])(teamMembers);
  }
  if (searchTerm)
    filterMembers = filterMembers.filter((members) =>
      (members.first_name + members.last_name + members.email).includes(
        searchTerm
      )
    );
  return filterMembers;
};

export const getMemberFilterCounts = (teamMembers) => {
  const allCount = teamMembers.length;
  const activeCount = teamMembers.filter((member) => member.active).length;
  return {
    [MEMBER_FILTER.ALL.value]: allCount,
    [MEMBER_FILTER.ACTIVE.value]: activeCount,
    [MEMBER_FILTER.INACTIVE.value]: allCount - activeCount,
  };
};

export const getColumnData = (additionalColumns, handleUpdateStatus) => {
  return [
    {
      title: "Name",
      key: "name",
      render: (_, { first_name, last_name, profile_image_url, active }) => {
        const name = `${first_name} ${last_name}`;

        return (
          <div className="flex flex-row items-center">
            <Avatar
              user={{ name, imageUrl: profile_image_url }}
              size="medium"
              className="mr-2"
            />
            {name}
            <Tag
              style="outline"
              className="ml-2"
              color={active ? "green" : "red"}
              label={
                active
                  ? MEMBER_FILTER.ACTIVE.label
                  : MEMBER_FILTER.INACTIVE.label
              }
            />
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "organization_role",
    },
    ...additionalColumns,
    {
      key: "icon_button",
      render: (_, { first_name, last_name, id, active }) => {
        const name = `${first_name} ${last_name}`;
        return (
          <Dropdown icon={MenuHorizontal} buttonStyle="text" strategy="fixed">
            <li onClick={() => handleUpdateStatus({ id, name }, active)}>
              <Typography
                style="body2"
                className={classnames({ "neeto-ui-text-error": active })}
              >
                {active ? "Deactivate" : "Activate"}
              </Typography>
            </li>
          </Dropdown>
        );
      },
    },
  ];
};
