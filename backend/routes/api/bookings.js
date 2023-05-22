const express = require("express");

const { requireAuth } = require("../../utils/auth");
const {
  Booking,
  Review,
  ReviewImage,
  Spot,
  SpotImage,
  User,
  sequelize,
} = require("../../db/models");

const {
  handleValidationErrors,
  requireAuth,
} = require("../../utils/validation");

const router = express.Router();

router.get("/current", requireAuth, async (req, res, next) => {
  const { user } = req;
  let resultBooking = [];

  const bookingData = await Booking.findAll({
    where: { userId: user.id },
  });

  const spotData = await Spot.findAll({
    where: { ownerId: user.id },
    include: { model: SpotImage },
  });

  if (!bookingData)
    return res.status(404).json({
      message: "Booking couldn't be found",
    });
  for (let key in bookingData) {
    currObj = {};
    let currBooking = bookingData[key].toJSON();
    let currSpot = spotData[key].toJSON();
    currSpot.previewImage = currSpot.SpotImages;
    delete currSpot.SpotImages;
    currObj["Bookings"] = currBooking;
    currObj["Bookings"].Spot = currSpot;
    resultBooking.push(currObj);
  }
  return res.status(200).json(resultBooking);
});

module.exports = router;
