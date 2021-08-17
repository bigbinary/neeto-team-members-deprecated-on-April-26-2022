import * as R from "ramda";
import React, { useState, Fragment } from "react";
import { Button, Input, Label, Switch } from "@bigbinary/neetoui";

import useValidation from "../../hooks/useValidation";

const CreateMemberForm = ({
  onSubmit,
  onCancel,
  isInvited = false,
  submitting,
}) => {
  const validationSchema = {
    first_name: { presence: { message: "First name is required" } },
    last_name: { presence: { message: "Last name is required" } },
    email: {
      email: true,
    },
  };

  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    invite_status: "pending",
  });

  const { errors, handleSubmit, validateField } = useValidation(
    validationSchema,
    formValues
  );

  const handleFormChange = (attributeName, attributeValue) => {
    const newFormValues = R.clone(formValues);
    newFormValues[attributeName] = attributeValue;
    setFormValues(newFormValues);
    validateField(attributeName, attributeValue);
  };

  return (
    <Fragment>
      <div className="flex flex-row space-x-3 mb-3">
        <Input
          required
          autoFocus={true}
          label="First Name"
          name="organization_user[first_name]"
          value={formValues.first_name}
          onChange={event => handleFormChange("first_name", event.target.value)}
          error={errors.first_name}
        />
        <Input
          required
          label="Last Name"
          name="organization_user[last_name]"
          value={formValues.last_name}
          onChange={event => handleFormChange("last_name", event.target.value)}
          error={errors.last_name}
        />
      </div>
      <div className="mb-8">
        <Input
          required
          label="Email"
          name="organization_user[email]"
          value={formValues.email}
          onChange={event => handleFormChange("email", event.target.value)}
          error={errors.email}
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-baseline justify-start">
          <Label className="mb-1">Invite Email</Label>
          <p className="text-xs font-normal leading-4 text-gray-500">
            {isInvited
              ? "An invite email has been already sent"
              : "An invite can be sent later if you are not ready"}
          </p>
        </div>

        {isInvited ? (
          // <Button label="Resend" style="link" onClick={resendInvitation} />
          <Button label="Resend" style="link" />
        ) : (
          <Switch
            checked={formValues.invite_status === "pending" ? true : false}
            onChange={() => {
              handleFormChange(
                "invite_status",
                formValues.invite_status === "pending"
                  ? "not_invited"
                  : "pending"
              );
            }}
          />
        )}
      </div>

      <div className="nui-pane__footer nui-pane__footer--absolute">
        <Button
          onClick={onCancel}
          label="Cancel"
          size="large"
          style="secondary"
        />

        <Button
          onClick={e => handleSubmit(e, onSubmit)}
          type="submit"
          label="Submit"
          size="large"
          style="primary"
          className="ml-2"
          loading={submitting}
        />
      </div>
    </Fragment>
  );
};

export default CreateMemberForm;
