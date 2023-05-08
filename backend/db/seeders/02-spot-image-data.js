"use strict";

/** @type {import('sequelize-cli').Migration} */

const spotImageData = [
  { spotId: 1, url: "Image1.url", preview: true },
  { spotId: 2, url: "Image2.url", preview: true },
  { spotId: 3, url: "Image3.url", preview: true },
  { spotId: 4, url: "Image4.url", preview: true },
  { spotId: 5, url: "Image5.url", preview: true },
];

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
options.tableName = "SpotImages";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, spotImageData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, spotImageData);
  },
};
