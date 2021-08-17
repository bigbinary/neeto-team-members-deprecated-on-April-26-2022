function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var layouts = require('@bigbinary/neetoui/layouts');
var neetoui = require('@bigbinary/neetoui');
var axios = _interopDefault(require('axios'));
var R = require('ramda');
var validate = _interopDefault(require('validate.js'));

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var users = "/api/v1/users";
var createTeamMember = function createTeamMember(payload) {
  return axios.post(users, payload);
};
var getActiveMembers = function getActiveMembers() {
  return axios.get(users + "?active=true");
};
var getInactiveMembers = function getInactiveMembers() {
  return axios.get(users + "?inactive=true");
};
var setActivationStatus = function setActivationStatus(id, status) {
  return axios.put(users + "/" + id + "?active=" + status);
};

var Container = function Container(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "w-full overflow-y-hidden bg-white"
  }, children);
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var showToastrError = function showToastrError(errorObj) {
  var _errorObj$data, _errorObj$data2;

  var message;

  if (typeof errorObj === "string") {
    message = errorObj;
  } else if (Array.isArray(errorObj)) {
    message = R.join("\n", errorObj);
  } else if (Array.isArray(errorObj === null || errorObj === void 0 ? void 0 : errorObj.errors)) {
    message = R.join("\n", errorObj.errors);
  } else if (errorObj !== null && errorObj !== void 0 && errorObj.data && errorObj !== null && errorObj !== void 0 && (_errorObj$data = errorObj.data) !== null && _errorObj$data !== void 0 && _errorObj$data.error) {
    message = errorObj.data.error;
  } else if (errorObj !== null && errorObj !== void 0 && errorObj.data && errorObj !== null && errorObj !== void 0 && (_errorObj$data2 = errorObj.data) !== null && _errorObj$data2 !== void 0 && _errorObj$data2.errors) {
    message = R.join("\n", errorObj.data.errors);
  } else {
    message = "Something went wrong";
  }

  neetoui.Toastr.error({
    error: message
  });
};
var showToastrSuccess = function showToastrSuccess(message) {
  neetoui.Toastr.success(message);
};
var isPresent = R.compose(R.not, R.isEmpty);

var SubNavBar = function SubNavBar(_ref) {
  var activeTab = _ref.activeTab,
      setActiveTab = _ref.setActiveTab,
      tabs = _ref.tabs;
  return /*#__PURE__*/React__default.createElement(neetoui.Tab, {
    className: "mb-2"
  }, tabs.map(function (tab, index) {
    return /*#__PURE__*/React__default.createElement(neetoui.Tab.Item, {
      key: index,
      onClick: function onClick() {
        return setActiveTab(tab.value);
      },
      icon: tab.icon,
      active: tab.value === activeTab
    }, tab.label);
  }));
};

var UsersTable = function UsersTable(_ref) {
  var loading = _ref.loading,
      userData = _ref.userData,
      handleStatusChange = _ref.handleStatusChange;
  return /*#__PURE__*/React__default.createElement(React.Fragment, null, !loading ? /*#__PURE__*/React__default.createElement(React.Fragment, null, !userData ? /*#__PURE__*/React__default.createElement("p", {
    className: "p-6 text-gray"
  }, "No team members") : /*#__PURE__*/React__default.createElement("table", {
    className: "nui-table nui-table--avatar nui-table--hover nui-table--actions"
  }, /*#__PURE__*/React__default.createElement("tbody", null, userData.map(function (user) {
    var fullName = user.first_name + " " + user.last_name;
    var userRole = user.role;
    return /*#__PURE__*/React__default.createElement("tr", {
      key: user.id
    }, /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement("div", {
      className: "flex flex-row items-center justify-start text-gray-800"
    }, /*#__PURE__*/React__default.createElement(neetoui.Avatar, {
      size: 32,
      className: "mr-3",
      contact: {
        name: fullName
      }
    }), fullName)), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement("div", {
      className: "flex flex-row items-center justify-center"
    }, !user.active && userRole !== "super_admin" && /*#__PURE__*/React__default.createElement(neetoui.Tooltip, {
      content: "Activate",
      position: "bottom"
    }, /*#__PURE__*/React__default.createElement(neetoui.Button, {
      style: "icon",
      icon: "ri-shield-line ri-lg",
      onClick: function onClick(e) {
        e.stopPropagation();
        handleStatusChange(user === null || user === void 0 ? void 0 : user.id, "true");
      }
    })), user.active && userRole !== "super_admin" && /*#__PURE__*/React__default.createElement(neetoui.Tooltip, {
      content: "Deactivate",
      position: "bottom"
    }, /*#__PURE__*/React__default.createElement(neetoui.Button, {
      style: "icon",
      icon: "ri-shield-check-line ri-lg",
      onClick: function onClick(e) {
        e.stopPropagation();
        handleStatusChange(user === null || user === void 0 ? void 0 : user.id, "false");
      }
    })))));
  })))) : /*#__PURE__*/React__default.createElement("div", {
    className: "w-full h-60"
  }, /*#__PURE__*/React__default.createElement(neetoui.PageLoader, null)));
};

validate.validators.array = function (arrayItems, itemConstraints) {
  var arrayItemErrors = arrayItems.reduce(function (errors, item, index) {
    var error = validate(item, itemConstraints);
    if (error) errors[index] = error;
    return errors;
  }, {});
  return R.isEmpty(arrayItemErrors) ? null : {
    errors: arrayItemErrors
  };
};

var Validator = /*#__PURE__*/function () {
  function Validator(constraints) {
    this.constraints = constraints;
    this.validator = validate;
    this.validator.options = {
      fullMessages: false
    };
    this.validator.validators.presence.options = {
      allowEmpty: false
    };
  }

  var _proto = Validator.prototype;

  _proto.validateState = function validateState(payload, vldtnSchema) {
    if (vldtnSchema === void 0) {
      vldtnSchema = null;
    }

    var schema = vldtnSchema || this.constraints;
    var errors = this.validator(payload, schema) || {};
    return {
      isValid: R.isEmpty(errors),
      errors: errors
    };
  };

  _proto.validateField = function validateField(name, value) {
    return this.validator.single(value, this.constraints[name]);
  };

  return Validator;
}();

var useValidation = function useValidation(validationSchema, formStateValues, serverErrors) {
  if (serverErrors === void 0) {
    serverErrors = "";
  }

  var _useState = React.useState(serverErrors),
      errors = _useState[0],
      setErrors = _useState[1];

  var _useState2 = React.useState(false),
      isValidating = _useState2[0],
      setIsValidating = _useState2[1];

  var _useState3 = React.useState(false),
      scrollToDirty = _useState3[0],
      setScrollToDirty = _useState3[1];

  var validator = new Validator(validationSchema);
  React.useEffect(function () {
    if (scrollToDirty) {
      setScrollToDirty(false);
      var errorElement = document.querySelector("span.error");

      if (errorElement) {
        errorElement.parentElement.scrollIntoView();
      }
    }
  }, [scrollToDirty]);
  React.useEffect(function () {
    setErrors(serverErrors);
  }, [serverErrors]);

  var handleSubmit = function handleSubmit(event, successCallback) {
    event.preventDefault();
    if (!isValidating) setIsValidating(true);
    var form = validator.validateState(formStateValues);
    setErrors(form.errors);

    if (form.isValid) {
      successCallback(formStateValues);
    } else {
      setScrollToDirty(true);
    }
  };

  var validateField = function validateField(name, value, forceValidate, successCallback) {
    var _extends2, _successCallback;

    if (forceValidate === void 0) {
      forceValidate = false;
    }

    if (successCallback === void 0) {
      successCallback = null;
    }

    var newErrors = validator.validateField(name, value);
    setErrors(_extends({}, errors, (_extends2 = {}, _extends2[name] = newErrors, _extends2)));
    if (successCallback && R.not(newErrors)) successCallback((_successCallback = {}, _successCallback[name] = value, _successCallback));
    if (!isValidating && forceValidate) setIsValidating(true);
  };

  var resetValidation = function resetValidation() {
    setIsValidating(false);
    setErrors(null);
  };

  var validateForm = function validateForm() {
    if (!isValidating) setIsValidating(true);
    var form = validator.validateState(formStateValues);
    setErrors(form.errors);
    return form.isValid;
  };

  return {
    errors: errors,
    validateField: validateField,
    handleSubmit: handleSubmit,
    resetValidation: resetValidation,
    validateForm: validateForm
  };
};

var CreateMemberForm = function CreateMemberForm(_ref) {
  var onSubmit = _ref.onSubmit,
      onCancel = _ref.onCancel,
      _ref$isInvited = _ref.isInvited,
      isInvited = _ref$isInvited === void 0 ? false : _ref$isInvited,
      submitting = _ref.submitting;
  var validationSchema = {
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

  var _useState = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    invite_status: "pending"
  }),
      formValues = _useState[0],
      setFormValues = _useState[1];

  var _useValidation = useValidation(validationSchema, formValues),
      errors = _useValidation.errors,
      handleSubmit = _useValidation.handleSubmit,
      validateField = _useValidation.validateField;

  var handleFormChange = function handleFormChange(attributeName, attributeValue) {
    var newFormValues = R.clone(formValues);
    newFormValues[attributeName] = attributeValue;
    setFormValues(newFormValues);
    validateField(attributeName, attributeValue);
  };

  return /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "flex flex-row space-x-3 mb-3"
  }, /*#__PURE__*/React__default.createElement(neetoui.Input, {
    required: true,
    autoFocus: true,
    label: "First Name",
    name: "organization_user[first_name]",
    value: formValues.first_name,
    onChange: function onChange(event) {
      return handleFormChange("first_name", event.target.value);
    },
    error: errors.first_name
  }), /*#__PURE__*/React__default.createElement(neetoui.Input, {
    required: true,
    label: "Last Name",
    name: "organization_user[last_name]",
    value: formValues.last_name,
    onChange: function onChange(event) {
      return handleFormChange("last_name", event.target.value);
    },
    error: errors.last_name
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/React__default.createElement(neetoui.Input, {
    required: true,
    label: "Email",
    name: "organization_user[email]",
    value: formValues.email,
    onChange: function onChange(event) {
      return handleFormChange("email", event.target.value);
    },
    error: errors.email
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "flex flex-row items-center justify-between"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "flex flex-col items-baseline justify-start"
  }, /*#__PURE__*/React__default.createElement(neetoui.Label, {
    className: "mb-1"
  }, "Invite Email"), /*#__PURE__*/React__default.createElement("p", {
    className: "text-xs font-normal leading-4 text-gray-500"
  }, isInvited ? "An invite email has been already sent" : "An invite can be sent later if you are not ready")), isInvited ?
  /*#__PURE__*/
  React__default.createElement(neetoui.Button, {
    label: "Resend",
    style: "link"
  }) : /*#__PURE__*/React__default.createElement(neetoui.Switch, {
    checked: formValues.invite_status === "pending" ? true : false,
    onChange: function onChange() {
      handleFormChange("invite_status", formValues.invite_status === "pending" ? "not_invited" : "pending");
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "nui-pane__footer nui-pane__footer--absolute"
  }, /*#__PURE__*/React__default.createElement(neetoui.Button, {
    onClick: onCancel,
    label: "Cancel",
    size: "large",
    style: "secondary"
  }), /*#__PURE__*/React__default.createElement(neetoui.Button, {
    onClick: function onClick(e) {
      return handleSubmit(e, onSubmit);
    },
    type: "submit",
    label: "Submit",
    size: "large",
    style: "primary",
    className: "ml-2",
    loading: submitting
  })));
};

var CreateMember = function CreateMember(_ref) {
  var createUser = function createUser(payload) {
    try {
      setSubmitting(true);

      var _temp2 = _catch(function () {
        return Promise.resolve(createTeamMember({
          user: payload
        })).then(function (response) {
          showToastrSuccess(response.data.notice);
          setReloadUsers(true);
          setSubmitting(false);
          onClose();
        });
      }, function (err) {
        setSubmitting(false);
        showToastrError(err);
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var isOpen = _ref.isOpen,
      setReloadUsers = _ref.setReloadUsers,
      onClose = _ref.onClose;

  var _useState = React.useState(false),
      submitting = _useState[0],
      setSubmitting = _useState[1];

  return /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement(neetoui.Pane, {
    title: "Add user",
    isOpen: isOpen,
    onClose: onClose
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "px-6"
  }, /*#__PURE__*/React__default.createElement(CreateMemberForm, {
    onSubmit: createUser,
    onCancel: onClose,
    submitting: submitting
  }))));
};

var Members = function Members() {
  var _useState = React.useState([]),
      users = _useState[0],
      setUsers = _useState[1];

  var _useState2 = React.useState(false),
      reloadMembers = _useState2[0],
      setReloadMembers = _useState2[1];

  var _useState3 = React.useState("active"),
      activeTab = _useState3[0],
      setActiveTab = _useState3[1];

  var _useState4 = React.useState(false),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = React.useState(false),
      showCreateForm = _useState5[0],
      setShowCreateForm = _useState5[1];

  var TABS = [{
    label: "Active Members",
    value: "active"
  }, {
    label: "Inactive Members",
    value: "inactive"
  }];
  var currentMemberFetch = {
    active: getActiveMembers,
    inactive: getInactiveMembers
  }[activeTab];

  var loadMembers = function loadMembers() {
    try {
      setLoading(true);

      var _temp2 = _catch(function () {
        return Promise.resolve(currentMemberFetch()).then(function (response) {
          setUsers(response.data);
          setLoading(false);
        });
      }, function (error) {
        showToastrError(error);
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var handleStatusChange = function handleStatusChange(id, active) {
    try {
      var _temp4 = _catch(function () {
        return Promise.resolve(setActivationStatus(id, active)).then(function (response) {
          var user = response.data;
          var status = user.active ? "active" : "inactive";
          setActiveTab(status);
          showToastrSuccess(response.data.notice);
        });
      }, function (err) {
        showToastrError(err);
      });

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  React.useEffect(function () {
    loadMembers();
    setReloadMembers(false);
  }, [activeTab, reloadMembers]);
  return /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement(layouts.MainLayout, null, function () {
    return /*#__PURE__*/React__default.createElement(Container, null, /*#__PURE__*/React__default.createElement(layouts.Header, {
      title: "Members",
      actionBlock: /*#__PURE__*/React__default.createElement(neetoui.Button, {
        icon: "ri-add-line",
        label: "Add a Member",
        onClick: function onClick() {
          return setShowCreateForm(true);
        }
      })
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "w-full bg-white"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "p-6 bg-white nf-scrollable-container"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "flex flex-row flex-wrap items-start justify-start",
      "data-cy": "forms"
    }, /*#__PURE__*/React__default.createElement(SubNavBar, {
      tabs: TABS,
      activeTab: activeTab,
      setActiveTab: setActiveTab
    }), loading ? /*#__PURE__*/React__default.createElement("div", {
      className: "w-full h-60"
    }, /*#__PURE__*/React__default.createElement(neetoui.PageLoader, null)) : /*#__PURE__*/React__default.createElement(UsersTable, {
      loading: loading,
      userData: users,
      handleStatusChange: handleStatusChange
    })))));
  }), showCreateForm && /*#__PURE__*/React__default.createElement(CreateMember, {
    isOpen: showCreateForm,
    setReloadUsers: setReloadMembers,
    onClose: function onClose() {
      return setShowCreateForm(false);
    }
  }));
};

module.exports = Members;
//# sourceMappingURL=index.js.map
