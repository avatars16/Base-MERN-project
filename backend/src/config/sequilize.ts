import { Sequelize } from "sequelize-typescript";
import logger from "../logger/index";

const dialect = (process.env.DB_DIALECT as "mysql" | "postgres" | "sqlite" | "mssql" | undefined) || "mysql";
const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PWD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    dialect: dialect,
    logging: (msg) => {
        logger.debug(JSON.stringify(msg));
    },
});

sequelize
    .authenticate()
    .then((conn) => {
        logger.info("Connected to database", JSON.stringify(conn));
    })
    .catch((err) => {
        logger.error(JSON.stringify(err));
    });

export { sequelize };
