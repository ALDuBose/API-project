"use strict";
const bcrypt = require("bcryptjs");

const userData = [
  {
    email: "demo@user.io",
    username: "Demo-lition",
    hashedPassword: bcrypt.hashSync("password"),
  },
  {
    email: "user1@user.io",
    username: "FakeUser1",
    hashedPassword: bcrypt.hashSync("password2"),
  },
  {
    email: "user2@user.io",
    username: "FakeUser2",
    hashedPassword: bcrypt.hashSync("password3"),
  },
];

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
options.tableName = "Users";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, userData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, userData);
  },
};
