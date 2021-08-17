// Global config for validate.js

import validate from "validate.js";
import * as R from "ramda";

validate.validators.array = (arrayItems, itemConstraints) => {
  const arrayItemErrors = arrayItems.reduce((errors, item, index) => {
    const error = validate(item, itemConstraints);
    if (error) errors[index] = error;

    return errors;
  }, {});

  return R.isEmpty(arrayItemErrors) ? null : { errors: arrayItemErrors };
};

export default class Validator {
  constructor(constraints) {
    this.constraints = constraints;
    this.validator = validate;
    this.validator.options = { fullMessages: false };
    this.validator.validators.presence.options = { allowEmpty: false };
  }

  validateState(payload, vldtnSchema = null) {
    let schema = vldtnSchema || this.constraints;
    const errors = this.validator(payload, schema) || {};

    return {
      isValid: R.isEmpty(errors),
      errors: errors,
    };
  }

  validateField(name, value) {
    return this.validator.single(value, this.constraints[name]);
  }
}
