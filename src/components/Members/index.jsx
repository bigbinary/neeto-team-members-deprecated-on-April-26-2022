import React, { useState, useEffect, Fragment } from "react";
import { MainLayout, Header } from "@bigbinary/neetoui/layouts";
import { PageLoader, Button } from "@bigbinary/neetoui";
import {
  getActiveMembers,
  getInactiveMembers,
  setActivationStatus,
} from "../../apis/users";
import Container from "../Common/Container";
import { showToastrError, showToastrSuccess } from "../Common";
import SubNavBar from "../Common/SubNavBar";
import Table from "./Table";
import CreateMember from "./CreateMember";

const Members = () => {
  const [users, setUsers] = useState([]);
  const [reloadMembers, setReloadMembers] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const TABS = [
    { label: "Active Members", value: "active" },
    { label: "Inactive Members", value: "inactive" },
  ];

  const currentMemberFetch = {
    active: getActiveMembers,
    inactive: getInactiveMembers,
  }[activeTab];

  const loadMembers = async () => {
    setLoading(true);
    try {
      const response = await currentMemberFetch();
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      showToastrError(error);
    }
  };

  const handleStatusChange = async (id, active) => {
    try {
      const response = await setActivationStatus(id, active);
      const user = response.data;
      const status = user.active ? "active" : "inactive";
      setActiveTab(status);
      showToastrSuccess(response.data.notice);
    } catch (err) {
      showToastrError(err);
    }
  };

  useEffect(() => {
    loadMembers();
    setReloadMembers(false);
  }, [activeTab, reloadMembers]);

  return (
    <Fragment>
      <MainLayout>
        {() => (
          <Container>
            <Header
              title="Members"
              actionBlock={
                <Button
                  icon="ri-add-line"
                  label="Add a Member"
                  onClick={() => setShowCreateForm(true)}
                />
              }
            />
            <div className="w-full bg-white">
              <div className="p-6 bg-white nf-scrollable-container">
                <div
                  className="flex flex-row flex-wrap items-start justify-start"
                  data-cy="forms"
                >
                  <SubNavBar
                    tabs={TABS}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                  {loading ? (
                    <div className="w-full h-60">
                      <PageLoader />
                    </div>
                  ) : (
                    <Table
                      loading={loading}
                      userData={users}
                      handleStatusChange={handleStatusChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </Container>
        )}
      </MainLayout>
      {showCreateForm && (
        <CreateMember
          isOpen={showCreateForm}
          setReloadUsers={setReloadMembers}
          onClose={() => setShowCreateForm(false)}
        />
      )}
    </Fragment>
  );
};

export default Members;
