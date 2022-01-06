import React, { useState } from "react";

import { Pane, Button, Typography, Toastr } from "@bigbinary/neetoui/v2";
import { Select } from "@bigbinary/neetoui/v2/formik";
import { Formik, Form } from "formik";

import { update } from "../apis";
import { EDIT_ROLE_VALIDATION_SCHEMA } from "../constants";

const INITIAL_FORM_VALUES = {
  role: "",
};

const EditRole = ({
  metaName,
  isOpen,
  onClose,
  roles,
  selectedMember,
  getUpdateMemberEndpoint,
  fetchTeamMembers,
}) => {
  const [initialFormValues, setInitialFormValues] = useState(INITIAL_FORM_VALUES);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    onClose();
    setInitialFormValues(INITIAL_FORM_VALUES);
  };

  const handleEditRole = async (values) => {
    try {
      const payload = {
          active: true,
          role: values.role,
      };
      await update(getUpdateMemberEndpoint(selectedMember), payload);
      fetchTeamMembers();
      handleClose();
      Toastr.success(`Updated ${metaName} successfully`);
    } catch (err) {
      Toastr.error(err);
    }
  };

  return (
    <Pane isOpen={isOpen} onClose={handleClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Update {metaName} Role
        </Typography>
      </Pane.Header>
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleEditRole}
        validationSchema={EDIT_ROLE_VALIDATION_SCHEMA}
        validateOnChange={submitted}
        validateOnBlur={submitted}
      >
        {({ values, isSubmitting, setFieldValue }) => {
          const roleValue = values.role
            ? { label: values.role, value: values.role }
            : null;
          return (
            <>
              <Form>
                <Pane.Body>
                  <div className="w-full">
                    <Select
                      label="Role"
                      size="small"
                      name="role"
                      onChange={(role) => setFieldValue("role", role.value)}
                      value={roleValue}
                      placeholder="Select Role"
                      options={roles.map((role) => ({
                        label: role,
                        value: role,
                      }))}
                      data-cy="add-member-role-select"
                    />
                  </div>
                </Pane.Body>

                <Pane.Footer>
                  <Button
                    type="submit"
                    label="Submit"
                    size="large"
                    style="primary"
                    className="mr-3"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    data-cy="add-member-submit-button"
                    onClick={() => setSubmitted(true)}
                  />

                  <Button
                    onClick={handleClose}
                    label="Cancel"
                    size="large"
                    style="text"
                    data-cy="add-member-cancel-button"
                  />
                </Pane.Footer>
              </Form>
            </>
          );
        }}
      </Formik>
    </Pane>
  );
};

export default EditRole;
