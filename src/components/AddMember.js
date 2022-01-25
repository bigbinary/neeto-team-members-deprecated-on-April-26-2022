import React, { useState } from "react";

import { Modal, Button, Typography, Toastr } from "@bigbinary/neetoui";
import { Input, Select } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";

import { post, update } from "../apis";
import { ADD_MEMBER_VALIDATION_SCHEMA } from "../constants";
import MultipleEmailInput from "./Common/MultipleEmailInput";

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
  const INITIAL_FORM_VALUES = {
    emails: selectedMember
      ? [{ label: selectedMember.email, value: selectedMember.email }]
      : [],
    role: selectedMember?.role || "",
  };
  const [submitted, setSubmitted] = useState(false);

  const renderPayload = (values) =>
    selectedMember
      ? {
          active: true,
          organization_role: values.role,
        }
      : {
          user: {
            first_name: "-",
            last_name: "-",
            emails: values.emails.map(({ value }) => value),
            invite_status: "pending",
            organization_role: values.role,
          },
        };

  const handleAddMember = async (values) => {
    try {
      selectedMember
        ? await update(
            getUpdateMemberEndpoint(selectedMember.id),
            renderPayload(values)
          )
        : await post(addMemberEndpoint, renderPayload(values));
      fetchTeamMembers();
      onClose();
      Toastr.success(
        `${selectedMember ? "Updated" : "Added"} ${metaName} successfully`
      );
    } catch (err) {
      Toastr.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Typography style="h2" weight="semibold">
          {selectedMember ? "Edit" : "Add New"} {metaName}
        </Typography>
      </Modal.Header>
      <Formik
        initialValues={INITIAL_FORM_VALUES}
        onSubmit={handleAddMember}
        validationSchema={ADD_MEMBER_VALIDATION_SCHEMA}
        validateOnChange={submitted}
        validateOnBlur={submitted}
        enableReinitialize
      >
        {({ values, isSubmitting, setFieldValue, errors, handleBlur }) => {
          const roleValue = values.role
            ? { label: values.role, value: values.role }
            : null;
          return (
            <>
              <Form>
                <Modal.Body>
                  <div className="w-full space-y-6">
                    {selectedMember ? (
                      <Input
                        label="Email(s)"
                        size="large"
                        name="emails"
                        data-cy="add-member-email-text-field"
                        value={values.emails[0].value}
                        disabled={selectedMember}
                      />
                    ) : (
                      <MultipleEmailInput
                        label="Email(s)"
                        name="emails"
                        value={values.emails}
                        onChange={(emails) => setFieldValue("emails", emails)}
                        error={errors.emails}
                        onBlur={handleBlur}
                        disabled={selectedMember}
                      />
                    )}

                    <Select
                      label="Role"
                      size="large"
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
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    type="submit"
                    label="Save Changes"
                    size="large"
                    style="primary"
                    className="mr-3"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    data-cy="add-member-submit-button"
                    onClick={() => setSubmitted(true)}
                  />

                  <Button
                    onClick={onClose}
                    label="Cancel"
                    size="large"
                    style="text"
                    data-cy="add-member-cancel-button"
                  />
                </Modal.Footer>
              </Form>
            </>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default AddMember;
