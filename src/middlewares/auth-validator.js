import {body} from "express-validator";
import { emailExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email valido"),
    body("email").custom(emailExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo"),
    validarCampos,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email Valido"),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("La contraseña debe tener 8 caracteres, una mayuscula, un numnero y un símbolo"),
    validarCampos,
    handleErrors
]
