import buildDevLogger from "./dev-logger";
import buildProductionLogger from "./production-logger";
import { Logger } from "winston";
import dotenv from "dotenv";
dotenv.config();

let logger: Logger;

if (process.env.NODE_ENV == "production") {
    logger = buildProductionLogger();
} else {
    logger = buildDevLogger();
}
logger.info("environment is: " + process.env.NODE_ENV);

export default logger;
