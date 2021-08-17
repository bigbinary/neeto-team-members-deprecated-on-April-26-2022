import React, { Fragment, useState, useEffect } from 'react';
import { MainLayout, Header } from '@bigbinary/neetoui/layouts';
import { Toastr, Tab, Avatar, Tooltip, Button, PageLoader, Input, Label, Switch, Pane } from '@bigbinary/neetoui';
import axios from 'axios';
import { compose, not, isEmpty, join, clone } from 'ramda';
import validate from 'validate.js';

const users = "/api/v1/users";
const createTeamMember = payload => {
  return axios.post(users, payload);
};
const getActiveMembers = () => {
  return axios.get(`${users}?active=true`);
};
const getInactiveMembers = () => {
  return axios.get(`${users}?inactive=true`);
};
const setActivationStatus = (id, status) => {
  return axios.put(`${users}/${id}?active=${status}`);
};

const Container = ({
  children
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full overflow-y-hidden bg-white"
  }, children);
};

const showToastrError = errorObj => {
  var _errorObj$data, _errorObj$data2;

  let message;

  if (typeof errorObj === "string") {
    message = errorObj;
  } else if (Array.isArray(errorObj)) {
    message = join("\n", errorObj);
  } else if (Array.isArray(errorObj === null || errorObj === void 0 ? void 0 : errorObj.errors)) {
    message = join("\n", errorObj.errors);
  } else if (errorObj !== null && errorObj !== void 0 && errorObj.data && errorObj !== null && errorObj !== void 0 && (_errorObj$data = errorObj.data) !== null && _errorObj$data !== void 0 && _errorObj$data.error) {
    message = errorObj.data.error;
  } else if (errorObj !== null && errorObj !== void 0 && errorObj.data && errorObj !== null && errorObj !== void 0 && (_errorObj$data2 = errorObj.data) !== null && _errorObj$data2 !== void 0 && _errorObj$data2.errors) {
    message = join("\n", errorObj.data.errors);
  } else {
    message = "Something went wrong";
  }

  Toastr.error({
    error: message
  });
};
const showToastrSuccess = message => {
  Toastr.success(message);
};
const isPresent = compose(not, isEmpty);

const SubNavBar = ({
  activeTab,
  setActiveTab,
  tabs
}) => {
  return /*#__PURE__*/React.createElement(Tab, {
    className: "mb-2"
  }, tabs.map((tab, index) => /*#__PURE__*/React.createElement(Tab.Item, {
    key: index,
    onClick: () => setActiveTab(tab.value),
    icon: tab.icon,
    active: tab.value === activeTab
  }, tab.label)));
};

const UsersTable = ({
  loading,
  userData,
  handleStatusChange
}) => {
  return /*#__PURE__*/React.createElement(Fragment, null, !loading ? /*#__PURE__*/React.createElement(Fragment, null, !userData ? /*#__PURE__*/React.createElement("p", {
    className: "p-6 text-gray"
  }, "No team members") : /*#__PURE__*/React.createElement("table", {
    className: "nui-table nui-table--avatar nui-table--hover nui-table--actions"
  }, /*#__PURE__*/React.createElement("tbody", null, userData.map(user => {
    const fullName = `${user.first_name} ${user.last_name}`;
    const userRole = user.role;
    return /*#__PURE__*/React.createElement("tr", {
      key: user.id
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row items-center justify-start text-gray-800"
    }, /*#__PURE__*/React.createElement(Avatar, {
      size: 32,
      className: "mr-3",
      contact: {
        name: fullName
      }
    }), fullName)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row items-center justify-center"
    }, !user.active && userRole !== "super_admin" && /*#__PURE__*/React.createElement(Tooltip, {
      content: "Activate",
      position: "bottom"
    }, /*#__PURE__*/React.createElement(Button, {
      style: "icon",
      icon: "ri-shield-line ri-lg",
      onClick: e => {
        e.stopPropagation();
        handleStatusChange(user === null || user === void 0 ? void 0 : user.id, "true");
      }
    })), user.active && userRole !== "super_admin" && /*#__PURE__*/React.createElement(Tooltip, {
      content: "Deactivate",
      position: "bottom"
    }, /*#__PURE__*/React.createElement(Button, {
      style: "icon",
      icon: "ri-shield-check-line ri-lg",
      onClick: e => {
        e.stopPropagation();
        handleStatusChange(user === null || user === void 0 ? void 0 : user.id, "false");
      }
    })))));
  })))) : /*#__PURE__*/React.createElement("div", {
    className: "w-full h-60"
  }, /*#__PURE__*/React.createElement(PageLoader, null)));
};

validate.validators.array = (arrayItems, itemConstraints) => {
  const arrayItemErrors = arrayItems.reduce((errors, item, index) => {
    const error = validate(item, itemConstraints);
    if (error) errors[index] = error;
    return errors;
  }, {});
  return isEmpty(arrayItemErrors) ? null : {
    errors: arrayItemErrors
  };
};

class Validator {
  constructor(constraints) {
    this.constraints = constraints;
    this.validator = validate;
    this.validator.options = {
      fullMessages: false
    };
    this.validator.validators.presence.options = {
      allowEmpty: false
    };
  }

  validateState(payload, vldtnSchema = null) {
    let schema = vldtnSchema || this.constraints;
    const errors = this.validator(payload, schema) || {};
    return {
      isValid: isEmpty(errors),
      errors: errors
    };
  }

  validateField(name, value) {
    return this.validator.single(value, this.constraints[name]);
  }

}

const useValidation = (validationSchema, formStateValues, serverErrors = "") => {
  const [errors, setErrors] = useState(serverErrors);
  const [isValidating, setIsValidating] = useState(false);
  const [scrollToDirty, setScrollToDirty] = useState(false);
  const validator = new Validator(validationSchema);
  useEffect(() => {
    if (scrollToDirty) {
      setScrollToDirty(false);
      let errorElement = document.querySelector("span.error");

      if (errorElement) {
        errorElement.parentElement.scrollIntoView();
      }
    }
  }, [scrollToDirty]);
  useEffect(() => {
    setErrors(serverErrors);
  }, [serverErrors]);

  const handleSubmit = (event, successCallback) => {
    event.preventDefault();
    if (!isValidating) setIsValidating(true);
    const form = validator.validateState(formStateValues);
    setErrors(form.errors);

    if (form.isValid) {
      successCallback(formStateValues);
    } else {
      setScrollToDirty(true);
    }
  };

  const validateField = (name, value, forceValidate = false, successCallback = null) => {
    const newErrors = validator.validateField(name, value);
    setErrors({ ...errors,
      [name]: newErrors
    });
    if (successCallback && not(newErrors)) successCallback({
      [name]: value
    });
    if (!isValidating && forceValidate) setIsValidating(true);
  };

  const resetValidation = () => {
    setIsValidating(false);
    setErrors(null);
  };

  const validateForm = () => {
    if (!isValidating) setIsValidating(true);
    const form = validator.validateState(formStateValues);
    setErrors(form.errors);
    return form.isValid;
  };

  return {
    errors,
    validateField,
    handleSubmit,
    resetValidation,
    validateForm
  };
};

const CreateMemberForm = ({
  onSubmit,
  onCancel,
  isInvited: _isInvited = false,
  submitting
}) => {
  const validationSchema = {
    first_name: {
      presence: {
        message: "First name is required"
      }
    },
    last_name: {
      presence: {
        message: "Last name is required"
      }
    },
    email: {
      email: true
    }
  };
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    invite_status: "pending"
  });
  const {
    errors,
    handleSubmit,
    validateField
  } = useValidation(validationSchema, formValues);

  const handleFormChange = (attributeName, attributeValue) => {
    const newFormValues = clone(formValues);
    newFormValues[attributeName] = attributeValue;
    setFormValues(newFormValues);
    validateField(attributeName, attributeValue);
  };

  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row space-x-3 mb-3"
  }, /*#__PURE__*/React.createElement(Input, {
    required: true,
    autoFocus: true,
    label: "First Name",
    name: "organization_user[first_name]",
    value: formValues.first_name,
    onChange: event => handleFormChange("first_name", event.target.value),
    error: errors.first_name
  }), /*#__PURE__*/React.createElement(Input, {
    required: true,
    label: "Last Name",
    name: "organization_user[last_name]",
    value: formValues.last_name,
    onChange: event => handleFormChange("last_name", event.target.value),
    error: errors.last_name
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement(Input, {
    required: true,
    label: "Email",
    name: "organization_user[email]",
    value: formValues.email,
    onChange: event => handleFormChange("email", event.target.value),
    error: errors.email
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-baseline justify-start"
  }, /*#__PURE__*/React.createElement(Label, {
    className: "mb-1"
  }, "Invite Email"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-normal leading-4 text-gray-500"
  }, _isInvited ? "An invite email has been already sent" : "An invite can be sent later if you are not ready")), _isInvited ?
  /*#__PURE__*/
  React.createElement(Button, {
    label: "Resend",
    style: "link"
  }) : /*#__PURE__*/React.createElement(Switch, {
    checked: formValues.invite_status === "pending" ? true : false,
    onChange: () => {
      handleFormChange("invite_status", formValues.invite_status === "pending" ? "not_invited" : "pending");
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "nui-pane__footer nui-pane__footer--absolute"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: onCancel,
    label: "Cancel",
    size: "large",
    style: "secondary"
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: e => handleSubmit(e, onSubmit),
    type: "submit",
    label: "Submit",
    size: "large",
    style: "primary",
    className: "ml-2",
    loading: submitting
  })));
};

const CreateMember = ({
  isOpen,
  setReloadUsers,
  onClose
}) => {
  const [submitting, setSubmitting] = useState(false);

  async function createUser(payload) {
    setSubmitting(true);

    try {
      let response = await createTeamMember({
        user: payload
      });
      showToastrSuccess(response.data.notice);
      setReloadUsers(true);
      setSubmitting(false);
      onClose();
    } catch (err) {
      setSubmitting(false);
      showToastrError(err);
    }
  }

  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Pane, {
    title: "Add user",
    isOpen: isOpen,
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-6"
  }, /*#__PURE__*/React.createElement(CreateMemberForm, {
    onSubmit: createUser,
    onCancel: onClose,
    submitting: submitting
  }))));
};

const Members = () => {
  const [users, setUsers] = useState([]);
  const [reloadMembers, setReloadMembers] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const TABS = [{
    label: "Active Members",
    value: "active"
  }, {
    label: "Inactive Members",
    value: "inactive"
  }];
  const currentMemberFetch = {
    active: getActiveMembers,
    inactive: getInactiveMembers
  }[activeTab];

  const loadMembers = async () => {
    setLoading(true);

    try {
      const response = await currentMemberFetch();
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      showToastrError(error);
    }
  };

  const handleStatusChange = async (id, active) => {
    try {
      const response = await setActivationStatus(id, active);
      const user = response.data;
      const status = user.active ? "active" : "inactive";
      setActiveTab(status);
      showToastrSuccess(response.data.notice);
    } catch (err) {
      showToastrError(err);
    }
  };

  useEffect(() => {
    loadMembers();
    setReloadMembers(false);
  }, [activeTab, reloadMembers]);
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(MainLayout, null, () => /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Header, {
    title: "Members",
    actionBlock: /*#__PURE__*/React.createElement(Button, {
      icon: "ri-add-line",
      label: "Add a Member",
      onClick: () => setShowCreateForm(true)
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 bg-white nf-scrollable-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row flex-wrap items-start justify-start",
    "data-cy": "forms"
  }, /*#__PURE__*/React.createElement(SubNavBar, {
    tabs: TABS,
    activeTab: activeTab,
    setActiveTab: setActiveTab
  }), loading ? /*#__PURE__*/React.createElement("div", {
    className: "w-full h-60"
  }, /*#__PURE__*/React.createElement(PageLoader, null)) : /*#__PURE__*/React.createElement(UsersTable, {
    loading: loading,
    userData: users,
    handleStatusChange: handleStatusChange
  })))))), showCreateForm && /*#__PURE__*/React.createElement(CreateMember, {
    isOpen: showCreateForm,
    setReloadUsers: setReloadMembers,
    onClose: () => setShowCreateForm(false)
  }));
};

export default Members;
//# sourceMappingURL=index.modern.js.map
