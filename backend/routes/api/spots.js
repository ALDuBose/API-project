const express = require("express");
const { requireAuth } = require("../../utils/auth");
const {
  User,
  Spot,
  Review,
  SpotImage,
  Booking,
  ReviewImage,
  sequelize,
} = require("../../db/models");
const { validateSpot, validateReview } = require("../../utils/validation");
const moment = require("moment");
const router = express.Router();

router.get("/current", requireAuth, async (req, res, next) => {
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

router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const { user } = req;

  let spotData = await Spot.unscoped().findOne({
    where: { id: spotId },
    include: [{ model: Booking.unscoped() }, { model: User }],
  });

  if (!spotData)
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  if (!spotData.Bookings.length)
    return res.status(404).json({
      message: "Booking couldn't be found",
    });

  spotData = spotData.toJSON();
  spotData.Bookings[0].startDate = moment(spotData.Bookings.startDate).format(
    "MMMM Do YYYY"
  );
  spotData.Bookings[0].endDate = moment(spotData.Bookings.endDate).format(
    "MMMM Do YYYY"
  );
  spotData.Bookings[0].createdAt = moment(spotData.Bookings.createdAt).format(
    "MMMM Do YYYY"
  );
  spotData.Bookings[0].updatedAt = moment(spotData.Bookings.updatedAt).format(
    "MMMM Do YYYY"
  );
  console.log(spotData.Bookings);
  delete spotData.User.username;
  delete spotData.Bookings.id;
  delete spotData.Bookings.userId;

  let Bookings = [];

  if (spotData.ownerId === user.id) {
    Bookings.push(...spotData.Bookings, { User: spotData.User });
    return res.status(200).json({ Bookings });
  } else {
    Bookings.push(spotData.Bookings);
    res.status(200).json({ Bookings });
  }
});

router.get("/:spotId", async (req, res, next) => {
  const { spotId } = req.params;
  let updatedSpotData = [];
  let numReviews = 0;

  const spotData = await Spot.findAll({
    where: { id: spotId },
    include: [
      { model: Review },
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
      numReviews++;
      return (acc += obj.stars);
    }, 0);

    currReview
      ? (currSpot.avgRating = currReview / currSpot.Reviews.length)
      : (currSpot.avgRating = null);
    delete currSpot.Reviews;

    currSpot.Owner = currSpot.User;
    delete currSpot.User;

    currSpot["numReviews"] = numReviews;

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

router.get("/:spotId/reviews", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;

  const reviewData = await Review.unscoped().findAll({
    where: { spotId },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
  });

  if (!reviewData)
    return res.status(404).json({
      message: "Spot couldn't be found",
    });

  for (let key in reviewData) {
    currObj = reviewData[key].toJSON();
    console.log(currObj);
  }
  return res.status(200).json({ Reviews: reviewData });
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

router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const { user } = req;
  let { userId, startDate, endDate } = req.body;
  const errorResponse = {
    message: "Sorry, this spot is already booked for the specified dates",
    errors: {},
  };

  const bookingData = await Booking.findAll({
    where: { spotId },
    include: [{ model: Spot, attributes: ["id", "ownerId"] }],
  });

  let newBooking = await Booking.create({
    spotId: spotId,
    userId: user.id,
    startDate: startDate,
    endDate: endDate,
  });

  let userStartDate = moment(newBooking.startDate, moment.ISO_8601);
  let userEndDate = moment(newBooking.endDate, moment.ISO_8601);
  console.log(userStartDate, userEndDate);
  if (userStartDate > userEndDate)
    return res.status(404).json({
      message: "Bad Request",
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });

  for (let key in bookingData) {
    let currObj = bookingData[key].toJSON();
    let currStartDate = currObj.startDate;
    let currEndDate = currObj.endDate;

    if (user.id !== currObj.Spot["ownerId"])
      return res.status(403).json({ message: "Forbidden" });

    if (Date(currStartDate) === userStartDate) {
      errorResponse.errors["startDate"] =
        "Start date conflicts with an existing booking";
    }

    if (Date(currEndDate) === userEndDate) {
      errorResponse.errors["endDate"] =
        "End date conflicts with an existing booking";
    }

    if (Object.values(errorResponse.errors).length) {
      return res.status(403).json(errorResponse);
    }
  }

  //Not getting the format to take on this route
  // console.log(newBooking)
  // newBooking.startDate = moment(newBooking.startDate).format("MMMM Do YYYY");
  // newBooking.endDate = moment(newBooking.endDate).format("MMMM Do YYYY");
  // console.log(newBooking)

  return res.status(200).json(newBooking);
});

router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const { spotId } = req.params;
    const { user } = req;
    const { review, stars } = req.body;
    const reviewArr = [];

    let spotData = await Spot.findAll({
      where: { id: spotId },
      include: [{ model: Review }],
    });

    if (!spotData.length) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
    const newReview = await Review.create({
      userId: user.id,
      spotId,
      review,
      stars,
    });

    if (typeof newReview.review !== "string")
      return res.status(400).json({ review: "Review text is required" });

    spotData.forEach((el) => {
      if (!el.Reviews) return res.status(200).json(newReview);
      else {
        el.Reviews.forEach((review) => {
          reviewArr.push(review.userId);
        });
        if (reviewArr.includes(user.id)) {
          return res.status(403).json({
            message: "User already has a review for this spot",
          });
        }
      }
    });

    return res.status(200).json(newReview);
  }
);

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
  const { address, city, state, country, name, description, lat, lng, price } =
    req.body;
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

  spotData.address = address;
  spotData.city = city;
  spotData.state = state;
  spotData.country = country;
  spotData.name = name;
  spotData.description = description;
  spotData.lat = lat;
  spotData.lng = lng;
  spotData.price = price;
  await spotData.save();

  return res.status(200).json(spotData);
});

module.exports = router;
