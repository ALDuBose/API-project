"use strict";

/** @type {import('sequelize-cli').Migration} */

const reviewImageData = [
  {reviewed: 1, url: "Image1.url"},
  {reviewed: 2, url: "Image2.url"},
  {reviewed: 3, url: "Image3.url"},
  {reviewed: 4, url: "Image4.url"},
  {reviewed: 5, url: "Image5.url"}
];

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
options.tableName = "ReviewImages";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, reviewImageData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, reviewImageData);
  },
};
