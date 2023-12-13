"use strict";
const faker = require("@faker-js/faker").fakerNL;
const bcrypt = require("bcryptjs");

let salt;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            salt = await bcrypt.genSalt(10);
            const users = [...Array(100)].map(() => {
                const firstName = faker.person.firstName();
                const lastName = faker.person.lastName();
                return {
                    name: firstName + " " + lastName,
                    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
                    password: bcrypt.hashSync(faker.internet.password({ length: 8 }), salt),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
            });

            users.push({
                name: "Bart Evelo",
                email: "b.evelo@outlook.com",
                password: bcrypt.hashSync("bart", salt),
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            return queryInterface.bulkInsert("Users", users, {});
        } catch (error) {
            console.error("Error generating salt:", error);
            throw error; // Rethrow the error to stop the migration on failure
        }
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {});
    },
};
