import express from "express";
const router = express.Router();
import { protect } from "../middleware/auth.middleware";
import expressAsyncHandler from "express-async-handler";
import { sequelize } from "../config/sequilize";

router.get(
    "/sync",
    expressAsyncHandler(async (req, res, next) => {
        console.log("hoi");
        if (process.env.NODE_ENV !== "development") throw Error("This route is only accesible during development");
        if (req.query.alter) await sequelize.sync({ alter: true }); // /database/sync?alter
        else await sequelize.sync();
        res.json({ success: true });
    })
);

export default router;
