import * as yup from "yup";

export const ADD_MEMBER_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Please enter valid email"),
  role: yup.string().required("Please select a role"),
});

export const MEMBER_FILTER = {
  ALL: { label: "All", value: "ALL" },
  ACTIVE: { label: "Active", value: "ACTIVE" },
  INACTIVE: { label: "Inactive", value: "INACTIVE" },
};

export const DEFAULT_PAGE_SIZE = 15;
export const DEFAULT_PAGE_NUMBER = 1;
