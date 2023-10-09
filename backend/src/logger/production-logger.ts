import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
const { combine, timestamp, errors } = format;

function buildProductionLogger() {
    return createLogger({
        level: "debug",
        format: combine(timestamp(), errors({ stack: true }), format.json()),
        defaultMeta: { service: "user-service" },
        transports: [
            new transports.DailyRotateFile({
                filename: "./logs/all-logs-%DATE%.log",
                datePattern: "YYYY-MM",
                maxSize: "20m",
                level: "debug",
                format: combine(timestamp(), errors({ stack: true }), format.json()),
            }),
            new transports.DailyRotateFile({
                filename: "./logs/info-%DATE%.log",
                datePattern: "YYYY-MM",
                maxSize: "20m",
                level: "info",
                format: combine(timestamp(), errors({ stack: true }), format.json()),
            }),
            new transports.DailyRotateFile({
                filename: "./logs/error-%DATE%.log",
                datePattern: "YYYY-MM",
                maxSize: "20m",
                level: "error",
                format: combine(timestamp(), errors({ stack: true }), format.json()),
            }),
            new transports.Console(),
        ],
    });
}
export default buildProductionLogger;
