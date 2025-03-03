import {Schema, model} from "mongoose"

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "El nombre del usuario es obligatorio"],
        maxLength: [25, "El nombre no puede pasar de los 25 caracteres"],      
    },

    surname:{
        type: String,
        required: [true, "El apellido del usuario es obligatorio"],
        maxLength: [25, "El apellido no puede pasar de los 25 caracteres"],
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: [true, "Se requiere el email del usuario"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Se requiere una contraseña"]
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"],
        default: "USER_ROLE"
    },
    status:{
        type: String,
        default: true
    }

},
{
    versionKey: false,
    timeStamps: true

})

export default model("User", userSchema)