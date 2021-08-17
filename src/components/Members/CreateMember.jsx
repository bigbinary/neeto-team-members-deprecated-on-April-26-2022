import React, { useState, Fragment } from "react";
import { Pane } from "@bigbinary/neetoui";
import { createTeamMember } from "../../apis/users";
import { showToastrError, showToastrSuccess } from "../Common";

import CreateMemberForm from "./CreateMemberForm";

const CreateMember = ({ isOpen, setReloadUsers, onClose }) => {
  const [submitting, setSubmitting] = useState(false);

  async function createUser(payload) {
    setSubmitting(true);
    try {
      let response = await createTeamMember({ user: payload });
      showToastrSuccess(response.data.notice);
      setReloadUsers(true);
      setSubmitting(false);
      onClose();
    } catch (err) {
      setSubmitting(false);
      showToastrError(err);
    }
  }

  return (
    <Fragment>
      <Pane title={"Add user"} isOpen={isOpen} onClose={onClose}>
        <div className="px-6">
          <CreateMemberForm
            onSubmit={createUser}
            onCancel={onClose}
            submitting={submitting}
          />
        </div>
      </Pane>
    </Fragment>
  );
};

export default CreateMember;
