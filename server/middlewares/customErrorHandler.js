export const customErrorHandler = (err, req, res, next) => {
  err.message = err.message || "Internal server error.";
  err.statusCode = err.statusCode || 500;
  if (err?.code === 11000) {
    err.message =
      "User already exists with given " +
      Object.keys(err.keyPattern).join(", ");
    err.statusCode = 409;
  }
  if (err.message === "jwt expired") {
    err.message = "Token expired";
    err.statusCode = 401;
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
