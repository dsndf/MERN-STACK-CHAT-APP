export const cookieOptions = {
    httpOnly:process.env.NODE_ENV === "production"?true:false,
    maxAge:process.env.TOKEN_MAX_AGE,
    sameSite:"none",
    secure:process.env.NODE_ENV === "production"?true:false
}