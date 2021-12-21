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
} from "@bigbinary/neetoui/v2";

import MenuBar from "./Menu";
import AddMember from "./AddMember";

import { get, update } from "../apis";
import {
  getFilteredMembers,
  getColumnData,
  getMemberFilterCounts,
} from "../helpers";
import { MEMBER_FILTER, SAMPLE_DATA, ROLE_OPTIONS } from "../constants";

const TeamMembers = ({
  metaName = "Agent",
  getMembersEndpoint = "/api/v1/teams",
  addMemberEndpoint = "/api/v1/teams",
  updateMemberEndpoint = "/api/v1/teams",
  getRolesEndpoint = "/api/v1/server/roles",
  tableProps = {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [selectedMemberStatusFilter, setSelectedMemberStatusFilter] = useState(
    MEMBER_FILTER.ALL.value
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
      setIsLoading(true);
      const { data } = await get(getMembersEndpoint);
      setTeamMembers(data || SAMPLE_DATA);
    } catch (err) {
      Toastr.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const { data } = await get(getRolesEndpoint);
      setRoles(data.roles || ROLE_OPTIONS);
    } catch (err) {
      Toastr.error(err);
    }
  };

  const handleDeactivateAlertClose = () => {
    setSelectedMember(null);
    setIsAlertOpen(false);
  };

  const getUpdateMemberEndpoint = (userId) =>
    `${updateMemberEndpoint}/${userId}`;

  const deactivateMember = async (userId) => {
    try {
      setIsLoading(true);
      const payload = { active: false };
      await update(getUpdateMemberEndpoint(userId), payload);
      fetchTeamMembers();
      Toastr.success(`Deactivated ${metaName} successfuly`);
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
      Toastr.success(`Activated ${metaName} successfuly`);
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

  useEffect(() => {
    getMembersEndpoint && fetchTeamMembers();
    getRolesEndpoint && fetchRoles();
  }, []);

  return (
    <div className="flex neeto-ui-bg-white">
      <MenuBar
        showMenu={isMenuOpen}
        metaName={metaName}
        filterCounts={getMemberFilterCounts(teamMembers)}
        selectedMemberStatusFilter={selectedMemberStatusFilter}
        setSelectedMemberStatusFilter={setSelectedMemberStatusFilter}
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
        <SubHeader leftActionBlock={<SubHeaderLeftActionBlock />} />
        <Scrollable className="w-full">
          <Table
            rowData={filteredMembers.map((member) => ({
              key: member.id,
              ...member,
            }))}
            columnData={getColumnData(additionalColumns, handleUpdateStatus)}
            defaultPageSize={30}
            rowSelection={null}
            fixedHeight
            loading={isLoading}
            {...otherTableProps}
          />
        </Scrollable>
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
        loading={isLoading}
      />
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
