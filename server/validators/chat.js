import { body } from "express-validator"

export const createGroupValidator  = ()=>{
    return [body("members","Please provide members").notEmpty()];
}

