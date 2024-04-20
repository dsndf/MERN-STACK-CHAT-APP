
export const validatePassword = (val) => {
  let isValid = true;
  let errorMessage = "";
  const patternMatch =
    /^(?=.*[!@#$%^&*()-_+=|{}[\]:;"'<>,.?/])(?=.*[A-Z])(?=.*[0-9]).*$/.test(
      val
    );
  if (val.length < 8) {
    isValid = false;
    errorMessage = "Password must contain at least (8)characters";
    return { isValid, errorMessage };
  }
  if (val.length > 12) {
    isValid = false;
    errorMessage = "Password must contain  at most (12)characters";
    return { isValid, errorMessage };
  }
  if (!patternMatch) {
    isValid = false;
    errorMessage =
      "Password must contain at least (1)special character, (1)uppercase letter, (1)numerical digit";
  }
  return { isValid, errorMessage};
};
