export const validateNewGroupName = (value = "") => {
  if (value.length < 3) {
    return {
      isValid: false,
      errorMessage: "Group name must contain at least (3)characters",
    };
  }
  return {
    isValid: true,
    error:undefined
  };
};
