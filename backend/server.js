import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
const port = process.env.PORT || 5000;
dotenv.config();
connectDB();

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
    console.log(`Server started on port ${port}`);
});
