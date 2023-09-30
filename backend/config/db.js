import mongoose from "mongoose";
import logger from "../logger/index.js";

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        mongoose.set("debug", (collectionName, method, query, doc) => {
            logger.verbose(`${collectionName}.${method} ${JSON.stringify(query)}}`);
        });
        logger.info(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;
