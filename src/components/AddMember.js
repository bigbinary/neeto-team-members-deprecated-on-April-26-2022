import React, { useState, useEffect } from "react";

import { Pane, Button, Typography, Toastr } from "@bigbinary/neetoui";
import { Input, Select } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";

import { post, update } from "../apis";
import { ADD_MEMBER_VALIDATION_SCHEMA } from "../constants";

const INITIAL_FORM_VALUES = {
  email: "",
  role: "",
};

const AddMember = ({
  metaName,
  isOpen,
  onClose,
  roles,
  selectedMember,
  addMemberEndpoint,
  getUpdateMemberEndpoint,
  fetchTeamMembers,
}) => {
  const [initialFormValues, setInitialFormValues] =
    useState(INITIAL_FORM_VALUES);
  const [validationSchema, setValidationSchema] = useState(ADD_MEMBER_VALIDATION_SCHEMA);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    onClose();
    setInitialFormValues(INITIAL_FORM_VALUES);
  };

  useEffect(() => {
    if(selectedMember) {
      setInitialFormValues({ role: "" });
      setValidationSchema(yup.object().shape({
        role: yup.string().required("Please select a role"),
      }));
    }
  }, [selectedMember]);

  const handleAddMember = async (values) => {
    try {
      const payload = selectedMember ? {
        active: true,
        organization_role: values.role,
      } : 
      {
        user: {
          first_name: "-",
          last_name: "-",
          email: values.email,
          invite_status: "pending",
          organization_role: values.role,
        },
      };
      selectedMember ? 
        await update(getUpdateMemberEndpoint(selectedMember), payload) :
        await post(addMemberEndpoint, payload);
      fetchTeamMembers();
      handleClose();
      Toastr.success(`${selectedMember ? "Updated" : "Added"} ${metaName} successfully`);
    } catch (err) {
      Toastr.error(err);
    }
  };

  return (
    <Pane isOpen={isOpen} onClose={handleClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          {selectedMember ? "Update" : "Add New"} {metaName}
        </Typography>
      </Pane.Header>
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleAddMember}
        validationSchema={validationSchema}
        validateOnChange={submitted}
        validateOnBlur={submitted}
        enableReinitialize
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
                    {
                      !selectedMember && (
                        <Input
                          label="Email"
                          size="small"
                          name="email"
                          placeholder="Email"
                          data-cy="add-member-email-text-field"
                          className="mb-6"
                        />
                      )
                    }
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
