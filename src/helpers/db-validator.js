import User from "../user/user.model.js"

export const emailExists = async (email = "") => {
    const exist = await User.findOne({email})
    if(exist){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const exist = await User.findOne({username})
    if(exist){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const exist = await User.findById(uid)
    console.log(exist)
    if(!exist){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}