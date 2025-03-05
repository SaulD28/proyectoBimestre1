import { hash, verify } from "argon2";
import User from "../user/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
  try {
    const data = req.body;
    const encryptedPassword = await hash(data.password);
    data.password = encryptedPassword;

    const user = await User.create(data);

    return res.status(201).json({
      message: "User has been created",
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    return res.status(500).json({
      message: "User registration failed",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (!user) {
      return res.status(400).json({
        message: "Crendenciales inválidas",
        error: "No existe el usuario o correo ingresado",
      });
    }

    const validPassword = await verify(user.password, password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Crendenciales inválidas",
        error: "Contraseña incorrecta",
      });
    }

    const token = await generateJWT(user.id);

    return res.status(200).json({
      message: "Login successful",
      userDetails: {
        token: token,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "login failed, server error",
      error: err.message,
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