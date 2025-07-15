const validator = require("validator");
const validateSignUpData = (obj) => {
  if (!obj.firstName || obj.firstName.length < 4) {
    throw new Error("Please enter valid firstName");
  } else if (!validator.isEmail(obj.email)) {
    throw new Error("Not a valid email address");
  } else if (!validator.isStrongPassword(obj.password)) {
    throw new Error("Please specify the strong password");
  }
};
const validateEditData = (obj) => {
  const isAllowed = [
    "firstName",
    "lastName",
    "gender",
    "age",
    "photoUrl",
    "about",
    "skill",
  ];
  const isEditValid = Object.keys(obj).every((item) =>
    isAllowed.includes(item)
  );
  const invalidField = Object.keys(obj).filter(
    (item) => !isAllowed.includes(item)
  );
  return { isValid: isEditValid, invalidField };
};

module.exports = { validateSignUpData, validateEditData };
