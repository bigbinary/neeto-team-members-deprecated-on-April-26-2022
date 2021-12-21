import React, { useState } from "react";

import { Pane, Button, Typography, Toastr } from "@bigbinary/neetoui/v2";
import { Input, Select } from "@bigbinary/neetoui/v2/formik";
import { Formik, Form } from "formik";

import { post } from "../apis";
import { ADD_MEMBER_VALIDATION_SCHEMA } from "../constants";

const INITIAL_FORM_VALUES = {
  email: "",
  role: "",
};

const AddMember = ({
  metaName,
  isOpen,
  onClose,
  roles = [],
  addMemberEndpoint,
  fetchTeamMembers,
}) => {
  const [initialFormValues, setInitialFormValues] =
    useState(INITIAL_FORM_VALUES);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    onClose();
    setInitialFormValues(INITIAL_FORM_VALUES);
  };

  const handleAddMember = async (values) => {
    try {
      const payload = {
        user: {
          first_name: "-",
          last_name: "-",
          email: values.email,
          invite_status: "pending",
          organization_role: values.role,
        },
      };
      await post(addMemberEndpoint, payload);
      fetchTeamMembers();
      handleClose();
      Toastr.success(`Added ${metaName} successfully`);
    } catch (err) {
      Toastr.error(err);
    }
  };

  return (
    <Pane isOpen={isOpen} onClose={handleClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Add New {metaName}
        </Typography>
      </Pane.Header>
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleAddMember}
        validationSchema={ADD_MEMBER_VALIDATION_SCHEMA}
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
                    <Input
                      label="Email"
                      size="small"
                      name="email"
                      placeholder="Email"
                      data-cy="add-member-email-text-field"
                      className="mb-6"
                    />
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

export default AddMember;
