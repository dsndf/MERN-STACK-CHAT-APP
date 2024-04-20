export const validateUsername = (val) => {
    let isValid = true;
    let errorMessage = "";
    const patternMatch = /^(?=.*[@])(?=.*[0-9]).{5,}$/.test(val);
    if (val.length < 5) {
        isValid = false;
        errorMessage = "Username must contain at least 5 characters";
        return { isValid, errorMessage };
    }
    if (!patternMatch) {
        isValid = false;
        errorMessage = "Username must contain @ and at least 1 numeric digit";
    }
    return { isValid, errorMessage };
};
