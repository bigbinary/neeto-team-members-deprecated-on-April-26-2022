import React from "react";

import { isEmpty } from "ramda";
import { Avatar, Dropdown, Typography, Tag } from "@bigbinary/neetoui";
import { MenuHorizontal } from "@bigbinary/neeto-icons";
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
      filterMembers = teamMembers;
  }
  if (searchTerm) {
    filterMembers = filterMembers.filter(
      ({ first_name: firstName, last_name: lastName, email }) =>
        `${firstName.toLowerCase()} ${lastName.toLowerCase()} ${email.toLowerCase()}`.includes(
          searchTerm.trim().toLowerCase()
        )
    );
  }
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

export const getColumnData = ({
  additionalColumns,
  selectedMemberStatusFilter,
  handleUpdateStatus,
  handleUpdateRole,
}) => {
  const diplayStatusTag =
    selectedMemberStatusFilter === MEMBER_FILTER.ALL.value;
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
            {diplayStatusTag && (
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
            )}
          </div>
        );
      },
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "35%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "organization_role",
      width: "25%",
    },
    ...additionalColumns,
    {
      key: "icon_button",
      render: (_, { first_name, last_name, id, active, email, role }) => {
        const name = `${first_name} ${last_name}`;
        return (
          <Dropdown icon={MenuHorizontal} buttonStyle="text" strategy="fixed">
            <li onClick={() => handleUpdateRole({ id, email, role })}>
              <Typography style="body2">Edit</Typography>
            </li>
            <li onClick={() => handleUpdateStatus({ id, name, active })}>
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
      width: "10%",
    },
  ];
};

export const getFilteredMembersCount = members =>
  isEmpty(members) ? 0 : members.length;
