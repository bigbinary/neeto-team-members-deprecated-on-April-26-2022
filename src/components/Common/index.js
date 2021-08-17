import { Toastr } from "@bigbinary/neetoui";
import * as R from "ramda";

export const showToastrError = errorObj => {
  let message;

  if (typeof errorObj === "string") {
    message = errorObj;
  } else if (Array.isArray(errorObj)) {
    message = R.join("\n", errorObj);
  } else if (Array.isArray(errorObj?.errors)) {
    message = R.join("\n", errorObj.errors);
  } else if (errorObj?.data && errorObj?.data?.error) {
    message = errorObj.data.error;
  } else if (errorObj?.data && errorObj?.data?.errors) {
    message = R.join("\n", errorObj.data.errors);
  } else {
    message = "Something went wrong";
  }
  Toastr.error({ error: message });
};

export const showToastrInfo = message => {
  Toastr.info(message);
};

export const showToastrSuccess = message => {
  Toastr.success(message);
};

export const isPresent = R.compose(R.not, R.isEmpty);

export const checkValid = (obj, isError = false) => {
  let isValidArr = false;
  if (isError) {
    isValidArr = Object.values(obj).some(
      currentError => currentError.length !== 0
    );
  } else {
    isValidArr = Object.values(obj).every(
      currentValue => currentValue.length !== 0
    );
  }
  return isValidArr;
};

export const getConfigState = (initialState, config) => {
  let clonedState = R.clone(initialState);
  for (let field in config) {
    if (config[field]) {
      clonedState = {
        ...clonedState,
        [field]: field == "prefix" ? "Mr" : "",
        error: { ...clonedState.error, [field]: "" },
      };
    } else {
      delete clonedState[field];
      delete clonedState.error[field];
    }
  }
  return clonedState;
};

export const getEmbedCode = formUrl => {
  return `
    <script src="http://${window.location.host}/javascript/embed.js"></script>
    <script>
      window.addEventListener('DOMContentLoaded', function () {
        window.neetoForm.embed('YOUR_BUTTON_ID', '${formUrl}')
      })
    </script>
  `;
};
