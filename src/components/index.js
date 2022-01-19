import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Plus, Search } from "@bigbinary/neeto-icons";
import { Container, Header, SubHeader } from "@bigbinary/neetoui/layouts";
import {
  Input,
  Alert,
  Table,
  Toastr,
  Button,
  Typography,
  PageLoader,
} from "@bigbinary/neetoui";

import MenuBar from "./Menu";
import AddMember from "./AddMember";
import EmptyState from "./EmptyState";

import { get, update } from "../apis";
import {
  getFilteredMembers,
  getColumnData,
  getMemberFilterCounts,
} from "../helpers";
import {
  MEMBER_FILTER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NUMBER,
} from "../constants";

const TeamMembers = ({
  metaName = "Agent",
  getMembersEndpoint = "/api/v1/teams",
  addMemberEndpoint = "/api/v1/teams",
  updateMemberEndpoint = "/api/v1/teams",
  getRolesEndpoint = "/api/v1/server/roles",
  tableProps = {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [selectedMemberStatusFilter, setSelectedMemberStatusFilter] = useState(
    MEMBER_FILTER.ACTIVE.value
  );

  const { additionalColumns = [], ...otherTableProps } = tableProps;

  const filteredMembers = getFilteredMembers(
    teamMembers,
    selectedMemberStatusFilter,
    searchTerm
  );

  const HeaderActionBlock = (metaName) => {
    return (
      <div className="flex space-x-3">
        <Input
          className="w-72"
          placeholder={`Search ${metaName}s`}
          prefix={<Search />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          icon={Plus}
          size="large"
          label={`Add New ${metaName}`}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
    );
  };

  const SubHeaderLeftActionBlock = () => {
    return (
      <Typography style="h4" component="h4">
        {filteredMembers.length}{" "}
        {filteredMembers.length === 1 ? metaName : `${metaName}s`}
      </Typography>
    );
  };

  const fetchTeamMembers = async () => {
    try {
      setIsPageLoading(true);
      const response = await get(getMembersEndpoint);
      const responseData = response?.data || response;
      const teamMembersData = responseData instanceof Array ? responseData : [];
      setTeamMembers(teamMembersData);
    } catch (err) {
      Toastr.error(err);
    } finally {
      setIsPageLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await get(getRolesEndpoint);
      const responseData = response?.data || response;
      const rolesData =
        responseData?.roles instanceof Array ? responseData?.roles : [];
      setRoles(rolesData);
    } catch (err) {
      Toastr.error(err);
    }
  };

  const handleDeactivateAlertClose = () => {
    setIsAlertOpen(false);
    setSelectedMember(null);
  };

  const getUpdateMemberEndpoint = (userId) =>
    `${updateMemberEndpoint}/${userId}`;

  const deactivateMember = async (userId) => {
    try {
      setIsLoading(true);
      const payload = { active: false };
      await update(getUpdateMemberEndpoint(userId), payload);
      fetchTeamMembers();
      Toastr.success(`Deactivated ${metaName} successfully`);
    } catch (err) {
      Toastr.error(err);
    } finally {
      handleDeactivateAlertClose();
      setIsLoading(false);
    }
  };

  const activateMember = async (userId) => {
    try {
      const payload = { active: true };
      await update(getUpdateMemberEndpoint(userId), payload);
      fetchTeamMembers();
      Toastr.success(`Activated ${metaName} successfully`);
    } catch (err) {
      Toastr.error(err);
    }
  };

  const handleUpdateStatus = (user, status) => {
    if (status) {
      setSelectedMember(user);
      setIsAlertOpen(true);
    } else {
      activateMember(user.id);
    }
  };

  const handleUpdateRole = (user) => {
    setSelectedMember(user);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const handleMemberFilterChange = (filter) => {
    setSelectedMemberStatusFilter(filter);
    setPageNumber(DEFAULT_PAGE_NUMBER);
  };

  useEffect(() => {
    getMembersEndpoint && fetchTeamMembers();
    getRolesEndpoint && fetchRoles();
  }, []);

  if (isPageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="overflow-auto w-full">
      <div className="flex neeto-ui-bg-white">
        <MenuBar
          showMenu={isMenuOpen}
          metaName={metaName}
          filterCounts={getMemberFilterCounts(teamMembers)}
          selectedMemberStatusFilter={selectedMemberStatusFilter}
          handleMemberFilterChange={handleMemberFilterChange}
        />
        <Container>
          <Header
            title={`${MEMBER_FILTER[selectedMemberStatusFilter].label} ${metaName}s`}
            menuBarToggle={() => setIsMenuOpen(!isMenuOpen)}
            actionBlock={HeaderActionBlock(metaName)}
          />
          {filteredMembers.length ? (
            <>
              <SubHeader leftActionBlock={<SubHeaderLeftActionBlock />} />
              <div className="neeto-team-members__table-wrapper" style={{height: `calc(100vh - 150px)`}}>
                <Table
                  rowData={filteredMembers}
                  columnData={getColumnData({
                    additionalColumns,
                    selectedMemberStatusFilter,
                    handleUpdateStatus,
                  })}
                  defaultPageSize={DEFAULT_PAGE_SIZE}
                  currentPageNumber={pageNumber}
                  handlePageChange={(page) => setPageNumber(page)}
                  rowSelection={null}
                  fixedHeight
                  {...otherTableProps}
                />
              </div>
            </>
          ) : (
            <EmptyState title={`No ${metaName}s found.`} />
          )}
        </Container>

        <AddMember
          metaName={metaName}
          isOpen={isModalOpen}
          onClose={handleClose}
          roles={roles}
          selectedMember={selectedMember}
          addMemberEndpoint={addMemberEndpoint}
          getUpdateMemberEndpoint={getUpdateMemberEndpoint}
          fetchTeamMembers={fetchTeamMembers}
        />
        <Alert
          isOpen={isAlertOpen}
          title={`Deactivate ${metaName}`}
          message={`You are deactivating ${selectedMember?.name}. Are you sure you want to continue?`}
          onClose={handleDeactivateAlertClose}
          onSubmit={() => deactivateMember(selectedMember?.id)}
          isSubmitting={isLoading}
        />
      </div>
    </div>
  );
};

TeamMembers.propTypes = {
  metaName: PropTypes.string,
  getMembersEndpoint: PropTypes.string,
  addMemberEndpoint: PropTypes.string,
  updateMemberEndpoint: PropTypes.string,
  getRolesEndpoint: PropTypes.string,
  tableProps: PropTypes.shape({
    additionalColumns: PropTypes.array,
  }),
};

export default TeamMembers;
