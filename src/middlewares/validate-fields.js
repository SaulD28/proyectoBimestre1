`user strict`

import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
    const errors = validationResult(Req)
    if(!errors.isEmpty()){
        return next(errors)
    }
    next()
}