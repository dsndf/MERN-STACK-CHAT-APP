import { compare } from "bcrypt"

export const validatePassword = async (hashedPassword, password) => {
    console.log({ hashedPassword, password });
    const isValid = await compare(password, hashedPassword);
    console.log({ isValid });
    return isValid;

}