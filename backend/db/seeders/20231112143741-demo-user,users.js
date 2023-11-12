"use strict";
const faker = require("@faker-js/faker").fakerNL;
const bcrypt = require("bcryptjs");

let salt;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            salt = await bcrypt.genSalt(10);

            const users = [...Array(100)].map(() => ({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: bcrypt.hashSync(faker.internet.password({ length: 8 }), salt),
                createdAt: new Date(),
                updatedAt: new Date(),
            }));

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
