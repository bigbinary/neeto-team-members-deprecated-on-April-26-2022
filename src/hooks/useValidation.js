import { useState, useEffect } from "react";
import Validator from "./validator";
import * as R from "ramda";

const useValidation = (
  validationSchema,
  formStateValues,
  serverErrors = ""
) => {
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

  const validateField = (
    name,
    value,
    forceValidate = false,
    successCallback = null
  ) => {
    const newErrors = validator.validateField(name, value);
    setErrors({ ...errors, [name]: newErrors });

    if (successCallback && R.not(newErrors)) successCallback({ [name]: value });

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
    validateForm,
  };
};

export default useValidation;
