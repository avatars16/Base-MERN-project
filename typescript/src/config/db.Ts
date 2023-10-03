import mongoose from "mongoose";
import logger from "../logger/index";

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        mongoose.set("debug", (collectionName, method, query, doc) => {
            logger.verbose(`${collectionName}.${method} ${JSON.stringify(query)}}`);
        });
        logger.info(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof mongoose.Error) logger.error(`Error ${error.message}`);
        else logger.error(`No mongoose error: ${error}`);
        process.exit(1);
    }
}

export default connectDB;
