import express from "express";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/error.middleware";
import userRoutes from "./routes/user.route";
import databaseRoutes from "./routes/database.route";
import path from "path";
import logger from "./logger/index";
import dotenv from "dotenv";
import { sequelize } from "./config/sequilize"; //Import ensures sequilize will be loaded
import useragent from "express-useragent";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

const port = process.env.PORT || 5000;

//Error handler
process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception:", err);
    process.exit(1); // Exit the application with an error code (1).
});

//App config
dotenv.config();
const app = express();

//Security stuff
app.set("trust proxy", 1); //Nginx proxy is a http request, for secure cookies etc we need to trust this proxy
app.use(helmet()); //Set secure http headers, more info: https://blog.logrocket.com/using-helmet-node-js-secure-application/
// app.use(cors({origin:http(s)://sub.domain.com:80})); //Cross-Origin Resource Sharing, use options to set specific origins to access backend;

//Logs all HTTP requests
app.use(morgan("combined", { stream: { write: (message) => logger.http(message) } }));

//Parse the raw request and turn it into usable properties
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express()); //Required for contextData

//Api Routes
app.use("/api/database/", databaseRoutes);
app.use("/api/users/", userRoutes);

//Serving dist files when in production
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.resolve(__dirname, "..", "frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../", "frontend", "dist", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("Server is ready!");
    });
}

//Error handlers
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
    logger.info(`Server started on port ${port} and environment is ${process.env.NODE_ENV}`);
});
