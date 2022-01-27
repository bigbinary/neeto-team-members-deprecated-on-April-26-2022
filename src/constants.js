import * as yup from "yup";

export const ADD_MEMBER_VALIDATION_SCHEMA = yup.object().shape({
  emails: yup
    .array()
    .min(1, "Atleast one email is required")
    .of(
      yup.object().shape({
        label: yup.string().email("Must be a valid email"),
        value: yup.string().email("Must be a valid email"),
      })
    )
    .required("Emails are required")
    .nullable(),
  role: yup.string().required("Please select a role"),
});

export const MEMBER_FILTER = {
  ALL: { label: "All", value: "ALL" },
  ACTIVE: { label: "Active", value: "ACTIVE" },
  INACTIVE: { label: "Deactivated", value: "INACTIVE" },
};

export const DEFAULT_PAGE_SIZE = 15;
export const DEFAULT_PAGE_NUMBER = 1;
