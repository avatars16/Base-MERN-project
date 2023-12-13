import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
const { combine, timestamp, label, printf, prettyPrint, align, colorize } = format;

function buildDevLogger() {
    const userLog = printf(({ level, message, timestamp, stack }) => {
        const stackFormat = stack ? stack : "";
        return `${timestamp} ${level}: ${message} ${stackFormat}`;
    });

    let basicFormat = combine(
        format.errors({ stack: true }),
        timestamp({ format: "HH:mm:ss" }),
        colorize(),
        align(),
        userLog
    );

    return createLogger({
        level: "debug",
        format: basicFormat,
        transports: [
            new transports.Console({
                format: combine(format.colorize(), basicFormat),
                level: "info",
            }),
            new transports.DailyRotateFile({
                filename: "./logs/all-logs-%DATE%.log",
                datePattern: "YYYY-MM",
                maxSize: "20m",
                level: "debug",
                format: combine(basicFormat, prettyPrint()),
            }),
            new transports.DailyRotateFile({
                filename: "./logs/info-%DATE%.log",
                datePattern: "YYYY-MM",
                maxSize: "20m",
                level: "info",
                format: combine(basicFormat, prettyPrint()),
            }),
        ],
    });
}
export default buildDevLogger;
