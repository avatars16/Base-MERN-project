import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
const { combine, timestamp, label, printf, prettyPrint, align, simple } = format;

function buildDevLogger() {
    const userLog = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${message || stack}`;
    });

    let basicFormat = combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }),
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
                filename: "./backend/logs/all-logs-%DATE%.log",
                datePattern: "YYYY-MM",
                maxSize: "20m",
                level: "debug",
                format: combine(basicFormat, prettyPrint()),
            }),
            new transports.DailyRotateFile({
                filename: "./backend/logs/info-%DATE%.log",
                datePattern: "YYYY-MM",
                maxSize: "20m",
                level: "info",
                format: combine(basicFormat, prettyPrint()),
            }),
        ],
    });
}
export default buildDevLogger;
