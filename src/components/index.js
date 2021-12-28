import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Plus } from "@bigbinary/neeto-icons";
import {
  Container,
  Scrollable,
  Header,
  SubHeader,
} from "@bigbinary/neetoui/v2/layouts";
import {
  Alert,
  Table,
  Toastr,
  Button,
  Typography,
  PageLoader,
} from "@bigbinary/neetoui/v2";

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
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
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

  const HeaderActionBlock = () => {
    return (
      <Button
        icon={Plus}
        size="large"
        label={`Add New ${metaName}`}
        onClick={() => setIsPaneOpen(true)}
      />
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
      const { data } = await get(getMembersEndpoint);
      const teamMembersData = data instanceof Array ? data : [];
      setTeamMembers(teamMembersData);
    } catch (err) {
      Toastr.error(err);
    } finally {
      setIsPageLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const { data } = await get(getRolesEndpoint);
      const rolesData = data?.roles instanceof Array ? data.roles : [];
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

  const handleMemberFilterChange = (filter) => {
    setSelectedMemberStatusFilter(filter);
    setPageNumber(DEFAULT_PAGE_NUMBER);
  };

  useEffect(() => {
    getMembersEndpoint && fetchTeamMembers();
    getRolesEndpoint && fetchRoles();
  }, []);

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
            searchProps={{
              placeholder: `Search ${metaName}s`,
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
            }}
            actionBlock={<HeaderActionBlock />}
          />
          {isPageLoading ? (
            <PageLoader />
          ) : filteredMembers.length ? (
            <>
              <SubHeader leftActionBlock={<SubHeaderLeftActionBlock />} />
              <Scrollable className="w-full">
                <Table
                  rowData={filteredMembers.map((member) => ({
                    key: member.id,
                    ...member,
                  }))}
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
              </Scrollable>
            </>
          ) : (
            <EmptyState title={`No ${metaName}s found.`} />
          )}
        </Container>

        <AddMember
          metaName={metaName}
          isOpen={isPaneOpen}
          onClose={() => setIsPaneOpen(false)}
          roles={roles}
          addMemberEndpoint={addMemberEndpoint}
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
