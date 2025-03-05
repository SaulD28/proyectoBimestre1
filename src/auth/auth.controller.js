import {hash, verify} from "argon2"
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js"



export const register = async (req, res) => {
    try{
        const data = req.body
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        
        const user = await User.create(data)

        return res.status(201).json({
            message: "Se ha registrado de manera exitosa el administrador",
            name: user.name,
            email: user.email
        })
    }catch (err) {
        return res. status(500).json({
            message: "Error al registrar el administrador",
            error: err.message 
        })
    }
}

export const login = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        console.log("Iniciando proceso de login...");  
        
        // Buscar usuario por email o username
        const user = await User.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (!user) {
            console.log("Usuario no encontrado"); 
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "No existe el usuario o correo ingresado"
            });
        }

        const validPassword = await verify(user.password, password);
        if (!validPassword) {
            console.log("Contraseña incorrecta"); 
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

     
        const token = await generateJWT(user.id);
        if (!token) {
            console.log("No se pudo generar el token"); 
            return res.status(500).json({
                message: "Error al generar el token",
                error: "No se pudo generar el token JWT"
            });
        }


        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            userDetails: {
                token: token,
                name: user.name,
                role: user.role
            }
        });

    } catch (err) {
        console.error("Error en el login:", err); 
        return res.status(500).json({
            message: "Fallo en el inicio de sesión, error en el servidor",
            error: err 
        });
    }
};



export const createAdmin = async () => {
    const createAdmin = {
        "name": "Edison",
        "surname": "Donis",
        "email": "edidonis42@gmail.com",
        "username": "SDonis28",
        "password": "HDoni$3jr",
        "role": "ADMIN_ROLE"
    }

    const user = await User.findOne({email: createAdmin.email})
    if(!user){
        createAdmin.password = await hash(createAdmin.password)
        await User.create(createAdmin)
        console.log(`Admin creado email: ${createAdmin.email}, Contraseña: HDoni$3jr`)
    }
}