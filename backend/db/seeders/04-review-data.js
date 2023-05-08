"use strict";

/** @type {import('sequelize-cli').Migration} */

const reviewData = [
  {
    spotId: 1,
    userId: 1,
    review: "The memory of this meal incites flatulence",
    stars: 0,
  },
  {
    spotId: 2,
    userId: 2,
    review:
      "Added so much salt and pepper Gordon Ramsay could hear the dish singing -Push It!",
    stars: 3,
  },
  {
    spotId: 3,
    userId: 3,
    review: "A bleak spot on the culinary landscape",
    stars: 1,
  },
  {
    spotId: 4,
    userId: 4,
    review:
      "It was so disturbing I took a picture and sent it to a friend, who responded, ‘That looks malignant’.",
    stars: 0,
  },
  {
    spotId: 5,
    userId: 5,
    review:
      "I never, ever, ever, ever, ever ate something I liked . . . as little as this",
    stars: 0,
  },
];

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
options.tableName = "Reviews";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, reviewData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, reviewData);
  },
};
