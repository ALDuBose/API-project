("use strict");
const bcrypt = require("bcryptjs");

const userData = [
  {
    email: "OBM@user.io",
    username: "OfficerBM",
    firstName: "Officer",
    lastName: "Big Mac",
    hashedPassword: bcrypt.hashSync("password"),
  },
  {
    email: "RMcDonald@user.io",
    username: "RMcDonald",
    firstName: "Ronald",
    lastName: "McDonald",
    hashedPassword: bcrypt.hashSync("password"),
  },
  {
    email: "Grimace@user.io",
    username: "Grimace",
    firstName: "Grimace",
    lastName: "McGrimacer",
    hashedPassword: bcrypt.hashSync("password"),
  },
  {
    email: "HB@user.io",
    username: "HamBurglar",
    firstName: "Ham",
    lastName: "Burglar",
    hashedPassword: bcrypt.hashSync("password"),
  },
  {
    email: "MMC@user.io",
    username: "MayorMcCheese",
    firstName: "Mayor",
    lastName: "McCheese",
    hashedPassword: bcrypt.hashSync("password"),
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
