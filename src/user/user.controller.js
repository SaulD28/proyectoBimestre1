import User from "../user/user.model.js";

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const userData = req.body;

        const loggedUser = await User.findById(req.user.id);

        if (userData.role && loggedUser.role !== "ADMIN_ROLE") {
            return res.status(403).json({
                success: false,
                msg: "No tienes los permisos necesarios para modificar este rol"
            });
        }

        const modifiedUser = await User.findByIdAndUpdate(uid, userData, { new: true });

        res.status(200).json({
            success: true,
            msg: "Información del usuario actualizada con éxito",
            user: modifiedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Hubo un error al intentar actualizar el usuario",
            error: err.message
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        console.log("Consultando la lista de usuarios...");

        const userList = await User.find();

        res.status(200).json({
            success: true,
            message: "Lista de usuarios obtenida correctamente",
            users: userList
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error al recuperar los datos de los usuarios",
            error
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params;
        console.log(`Intentando eliminar usuario con ID: ${uid}`);

        if (!req.user) {
            return res.status(401).json({
                success: false,
                msg: "Autenticación requerida para esta acción"
            });
        }

        // Verifica que el usuario autenticado sea el mismo que intenta eliminar
        if (req.user._id.toString() !== uid) {
            return res.status(403).json({
                success: false,
                msg: "No tienes autorización para eliminar este usuario"
            });
        }

        // Elimina al usuario de la base de datos
        const removedUser = await User.findByIdAndDelete(uid);

        if (!removedUser) {
            return res.status(404).json({
                success: false,
                msg: "Usuario no encontrado en la base de datos"
            });
        }

        // Responde con el éxito de la eliminación
        res.status(200).json({
            success: true,
            msg: "El usuario ha sido eliminado correctamente",
            user: removedUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Se produjo un error al eliminar el usuario",
            error: err.message
        });
    }
};
