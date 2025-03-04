import User from "./user.model.js"

export const getUsers = async (req, res) => {
    try {
        console.log("Obteniendo todos los usuarios...");

        const users = await User.find();

        res.status(200).json({
            success: true,
            message: "Usuario Administrador, acceso concedido: Usuarios obtenidos",
            users
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error al obtener los usuarios",
            error
        });
    }
};

export const deleteUser = async(req, res) => {
    try{

    }catch(err){

    }
}

export const updateUser = async (req, res) => {
    try{

    }catch(err){
        
    }
} 