import buildDevLogger from "./dev-logger.js";
import buildProductionLogger from "./production-logger.js";

let logger;
if (process.env.NODE_ENV == "production") {
    logger = buildDevLogger();
} else {
    logger = buildProductionLogger();
}
logger.info("environment is: " + process.env.NODE_ENV);

export default logger;
