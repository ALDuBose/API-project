const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();
const validateSpot = [
    check("address")
      .exists({ checkFalsy: true })
      .withMessage("Street address is required"),
    check("city")
      .exists({ checkFalsy: true })
      .withMessage("City is required"),
    check("state")
      .exists({ checkFalsy: true })
      .withMessage("State is required"),
    check("country")
      .exists({ checkFalsy: true })
      .withMessage("Country is required"),
    check("lat")
    .exists({ checkFalsy: true })
    .isInt({min: 1})
    .withMessage("Latitude is not valid"),
    check("lng")
      .exists({ checkFalsy: true })
      .isInt({max: -1})
      .withMessage("Longitude is not valid."),
    handleValidationErrors,
  ];

router.get("/", async (req, res, next) => {
  let updatedSpotData = [];
  const spotData = await Spot.findAll({
    include: [
      { model: Review, attributes: ["stars"] },
      { model: SpotImage, attributes: { exclude: ["createdAt", "updatedAt"] } },
    ],
  });

  for (let key in spotData) {
    let currSpot = spotData[key].toJSON();

    let currReview = currSpot.Reviews.reduce((acc, obj) => {
      return (acc += obj.stars);
    }, 0);
    currReview
      ? (currSpot.avgRating = currReview / currSpot.Reviews.length)
      : (currSpot.avgRating = null);
    delete currSpot.Reviews;

    let currImage = currSpot.SpotImages[0].url;
    currImage
      ? (currSpot.previewImage = currImage)
      : (currSpot.previewImage = null);
    delete currSpot.SpotImages;
    updatedSpotData.push(currSpot);
  }
  return res.status(200).json(updatedSpotData);
});

router.post("/", requireAuth, async (req, res, next) => {

  return res.status(201).json();
});
module.exports = router;
