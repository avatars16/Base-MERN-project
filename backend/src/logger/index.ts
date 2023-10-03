import buildDevLogger from "./dev-logger";
import buildProductionLogger from "./production-logger";
import { Logger } from "winston";

let logger: Logger;
if (process.env.NODE_ENV == "production") {
    logger = buildDevLogger();
} else {
    logger = buildProductionLogger();
}
logger.info("environment is: " + process.env.NODE_ENV);

export default logger;
