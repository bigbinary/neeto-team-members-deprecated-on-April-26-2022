import React, { Fragment } from "react";
import { Button, Avatar, Tooltip, PageLoader } from "@bigbinary/neetoui";

const UsersTable = ({ loading, userData, handleStatusChange }) => {
  return (
    <Fragment>
      {!loading ? (
        <>
          {!userData ? (
            <p className="p-6 text-gray">No team members</p>
          ) : (
            <table className="nui-table nui-table--avatar nui-table--hover nui-table--actions">
              <tbody>
                {userData.map(user => {
                  const fullName = `${user.first_name} ${user.last_name}`;
                  const userRole = user.role;
                  return (
                    <tr key={user.id}>
                      <td>
                        <div className="flex flex-row items-center justify-start text-gray-800">
                          <Avatar
                            size={32}
                            className="mr-3"
                            contact={{ name: fullName }}
                          />
                          {fullName}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-row items-center justify-center">
                          {!user.active && userRole !== "super_admin" && (
                            <Tooltip content="Activate" position="bottom">
                              <Button
                                style="icon"
                                icon="ri-shield-line ri-lg"
                                onClick={e => {
                                  e.stopPropagation();
                                  handleStatusChange(user?.id, "true");
                                }}
                              />
                            </Tooltip>
                          )}
                          {user.active && userRole !== "super_admin" && (
                            <Tooltip content="Deactivate" position="bottom">
                              <Button
                                style="icon"
                                icon="ri-shield-check-line ri-lg"
                                onClick={e => {
                                  e.stopPropagation();
                                  handleStatusChange(user?.id, "false");
                                }}
                              />
                            </Tooltip>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <div className="w-full h-60">
          <PageLoader />
        </div>
      )}
    </Fragment>
  );
};

export default UsersTable;
