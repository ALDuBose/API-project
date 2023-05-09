"use strict";

/** @type {import('sequelize-cli').Migration} */

const spotData = [
  {
    ownerId: 1,
    address: "123 McRoad",
    city: "McCity",
    country: "McCountry",
    lat: 36.746384,
    lng: -95.934525,
    name: "McLuncheon",
    description:
      "Two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun",
    price: 10.99,
  },
  {
    ownerId: 2,
    address: "123 McDrive",
    city: "McCity",
    country: "McCountry",
    lat: 37.746384,
    lng: -94.934525,
    name: "McBrunchin",
    description: "It's a good time for the great taste of McDonald's.",
    price: 2.99,
  },
  {
    ownerId: 3,
    address: "123 McAve",
    city: "McCity",
    country: "McCountry",
    lat: 38.746384,
    lng: -93.934525,
    name: "McCation",
    description: " I'm lovin' it!",
    price: 300.99,
  },
  {
    ownerId: 4,
    address: "123 McCircle",
    city: "McCity",
    country: "McCountry",
    lat: 39.746384,
    lng: -92.934525,
    name: "McTrip",
    description: "Did somebody say McDonald's?",
    price: 4.99,
  },
  {
    ownerId: 5,
    address: "123 McPlace",
    city: "McCity",
    country: "McCountry",
    lat: 40.746384,
    lng: -96.934525,
    name: "McFoodie",
    description: "What we're made of.",
    price: 50.99,
  },
];

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
options.tableName = "Spots";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, spotData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, spotData);
  },
  spotData,
};
