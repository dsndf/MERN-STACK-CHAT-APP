import { validationResult } from "express-validator";
import { ErrorHandler } from "../utils/errorHandler.js";

export const validator = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().reduce((acc,err)=>[...acc,err.msg],[]);  
      return next(new ErrorHandler(errorMessages.join(", "), 400));
    }
    next();
  };
  