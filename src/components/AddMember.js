import React, { useState } from "react";

import { Modal, Button, Typography, Toastr } from "@bigbinary/neetoui";
import { Input, Select } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";

import { post, update } from "../apis";
import { ADD_MEMBER_VALIDATION_SCHEMA } from "../constants";

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
    email: selectedMember?.email || "",
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
            email: values.email,
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
        {({ values, isSubmitting, setFieldValue }) => {
          const roleValue = values.role
            ? { label: values.role, value: values.role }
            : null;
          return (
            <>
              <Form>
                <Modal.Body>
                  <div className="w-full">
                    <Input
                      label="Email"
                      size="small"
                      name="email"
                      placeholder="Email"
                      data-cy="add-member-email-text-field"
                      className="mb-6"
                      disabled={selectedMember}
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
