import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import { createAdmin } from "../src/auth/auth.controller.js";
import userRoutes from "../src/user/user.routes.js";
import authRoutes from "../src/auth/auth.routes.js";

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"))
};

const routes = (app) => {
    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/user", userRoutes);
}



const conectarDB = async () => {
    try{
        await dbConnection();
        createAdmin();

    }catch (err){
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }

}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app);
        routes(app);
        conectarDB();
        app.listen(process.env.PORT);
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`);
    }
}