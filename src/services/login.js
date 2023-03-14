export const validate = (value, rules) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case "isEmail":
        isValid = isValid && emailValidator(value);
        break;
      case "minLength":
        isValid = isValid && minLengthValidator(value, rules[rule]);
        break;
      case "notEmpty":
        isValid = isValid && notEmptyValidator(value);
        break;
      default:
        isValid = true;
    }
  }
  return isValid;
}

const emailValidator = value => {
  return (
    typeof value === "string" &&
    value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
  );
}

const minLengthValidator = (value, minLength) => {
  return value.length >= minLength;
}

const notEmptyValidator = value => {
  return value.trim() !== "";
}

export const loginValid = (email, password) => {
  let valid = false;
  if (validate(email, { isEmail: true }) && validate(password, { minLength: 6, notEmpty: true })) {
    valid = true;
  }
  if(valid) {
    sessionStorage.setItem("user", JSON.stringify({ email, password }));
    return {
      success: true,
      message: "You are logged in!"
    }
  } else {
    return {
      success: false,
      message: "Invalid email or password"
    }
  }
}