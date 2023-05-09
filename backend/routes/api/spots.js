const express = require("express");

const { requireAuth } = require("../../utils/auth");
const {
  User,
  Spot,
  Review,
  SpotImage,
  Booking,
  sequelize,
} = require("../../db/models");

const {
  handleValidationErrors,
  validateSpot,
} = require("../../utils/validation");

const router = express.Router();

router.get("/:spotId", async (req, res, next) => {
  const { spotId } = req.params;
  let updatedSpotData = [];

  const spotData = await Spot.findAll({
    where: { id: spotId },
    attributes: {
      include: [
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM `Reviews` WHERE `Reviews`.`review` )"
          ),
          "numReviews",
        ],
      ],
    },
    include: [
      { model: Review, attributes: ["stars"] },
      {
        model: SpotImage,
        attributes: { exclude: ["createdAt", "updatedAt", "spotId"] },
      },
      {
        model: User,
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "username",
            "email",
            "hashedPassword",
          ],
        },
      },
    ],
  });

  if (!spotData)
    return res.status(404).json({
      message: "Spot couldn't be found",
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

    currSpot.Owner = currSpot.User;
    delete currSpot.User;

    updatedSpotData.push(currSpot);
  }
  return res.status(200).json(updatedSpotData);
});

router.get("/current", async (req, res, next) => {
  const { user } = req;
  let updatedSpotData = [];
  const spotData = await Spot.findAll({
    where: { ownerId: user.id },
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
    currSpot.SpotImages[0]
      ? (currSpot.previewImage = currSpot.SpotImages[0].url)
      : (currSpot.previewImage = null);
    delete currSpot.SpotImages;
    updatedSpotData.push(currSpot);
  }

  return res.status(200).json(updatedSpotData);
});

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
    currSpot.SpotImages[0]
      ? (currSpot.previewImage = currSpot.SpotImages[0].url)
      : (currSpot.previewImage = null);
    delete currSpot.SpotImages;
    updatedSpotData.push(currSpot);
  }
  return res.status(200).json(updatedSpotData);
});

router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { spotId } = req.params;
  const { url, preview } = req.body;
  let result = {};

  const spotData = await Spot.findOne({ where: { id: spotId } });

  if (!spotData)
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  if (user.id !== spotData.ownerId)
    return res.status(403).json({
      message: "Forbidden",
    });

  const newSpotImage = await SpotImage.create({
    spotId,
    url,
    preview,
  });

  result["id"] = newSpotImage.id;
  result["url"] = newSpotImage.url;
  result["preview"] = newSpotImage.preview;
  return res.status(200).json(result);
});

router.post("/", requireAuth, validateSpot, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const { user } = req;
  let errObj = {};
  const newSpot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  if (newSpot.lat < 0) errObj["lat"] = { message: "Latitude is not valid." };
  if (newSpot.lng > 0) errObj["lng"] = { message: "Longitude is not valid" };
  !errObj ? res.status(400).json(errObj) : res.status(201).json(newSpot);
});

router.put("/:spotId", requireAuth, validateSpot, async (req, res, next) => {
  const { spotId } = req.params;
  const {
    address,
    city,
    state,
    country,
    name,
    description,
    lat,
    lng,
    price,
  } = req.body;
  const { user } = req;
  const spotData = await Spot.findOne({
    where: { id: spotId },
    include: [{ model: Booking, attributes: [] }],
  });

  if (!spotData)
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  if (user.id !== spotData.ownerId)
    return res.status(403).json({
      message: "Forbidden",
    });


  spotData.address = address
  spotData.city = city
  spotData.state = state
  spotData.country = country
  spotData.name = name
  spotData.description = description
  spotData.lat = lat
  spotData.lng = lng
  spotData.price = price
  await spotData.save()


  return res.status(200).json(spotData);
});
module.exports = router;
