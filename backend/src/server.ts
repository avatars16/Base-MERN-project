import express from "express";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/error.middleware";
import userRoutes from "./routes/user.route";
import path from "path";
import logger from "./logger/index";
import dotenv from "dotenv";
import { sequelize } from "./config/sequilize.config";
dotenv.config();

process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception:", err);
    process.exit(1); // Exit the application with an error code (1).
});

const port = process.env.PORT || 5000;

const app = express();
app.set("trust proxy", 1); //Nginx proxy is a http request, for secure cookies etc we need to trust this proxy
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/users/", userRoutes);

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("Server is ready!");
    });
}
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
    logger.info(`Server started on port ${port} and environment is ${process.env.NODE_ENV}`);
});
