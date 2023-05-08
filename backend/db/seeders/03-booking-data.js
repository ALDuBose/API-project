"use strict";

/** @type {import('sequelize-cli').Migration} */

const bookingData = [
  { spotId: 1, userId: 1, startDate: "2025-11-19", endDate: "2025-11-21" },
  { spotId: 2, userId: 2, startDate: "2025-12-19", endDate: "2025-12-21" },
  { spotId: 3, userId: 3, startDate: "2025-04-19", endDate: "2025-04-21" },
  { spotId: 4, userId: 4, startDate: "2025-06-19", endDate: "2025-06-21" },
  { spotId: 5, userId: 5, startDate: "2025-07-19", endDate: "2025-07-21" },
];

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
options.tableName = "Bookings";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, bookingData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, bookingData);
  },
};
