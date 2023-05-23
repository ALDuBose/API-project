const express = require("express");

const {
  Booking,
  Review,
  ReviewImage,
  Spot,
  SpotImage,
  User,
  sequelize,
} = require("../../db/models");

const { requireAuth } = require("../../utils/auth");
const moment = require("moment");
const router = express.Router();

router.get("/current", requireAuth, async (req, res, next) => {
  const { user } = req;
  let resultBooking = [];

  const bookingData = await Booking.unscoped().findAll({
    where: { userId: user.id },
  });

  const spotData = await Spot.findAll({
    attributes: { exclude: ["description", "createdAt", "updatedAt"] },
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

router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const { bookingId } = req.params;
  const { spotId, userId, startDate, endDate } = req.body;
  const { user } = req;

  const errorResponse = {
    message: "Sorry, this spot is already booked for the specified dates",
    errors: {},
  };

  let bookingData = await Booking.unscoped().findOne({
    where: { id: bookingId },
    include: { model: Spot, attributes: { include: ["id"] } },
  });

  if (!bookingData)
    return res.status(404).json({
      message: "Booking couldn't be found",
    });

  if (user.id !== bookingData.userId)
    return res.status(403).json({
      message: "Forbidden",
    });

  const userStartDate = moment(bookingData.startDate, moment.ISO_8601);
  const userEndDate = moment(bookingData.endDate, moment.ISO_8601);

  if (userStartDate > userEndDate)
    return res.status(404).json({
      message: "Bad Request",
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });

  bookingData.spotId = bookingData.Spot.id;
  bookingData.userId = user.id;
  bookingData.startDate = startDate;
  bookingData.endDate = endDate;
  await bookingData.save();

  let updatedBooking = bookingData.get({ plain: true });
  delete updatedBooking.Spot;
  
// not hitting conflicts, lets me just keep editing even if no changes
    if (moment(bookingData.startDate, moment.ISO_860) === userStartDate) {
      errorResponse.errors["startDate"] =
        "Start date conflicts with an existing booking";
    }

    if (moment(bookingData.endDate, moment.ISO_860) === userEndDate) {
      errorResponse.errors["endDate"] =
        "End date conflicts with an existing booking";
    }

  updatedBooking.startDate = moment(updatedBooking.startDate).format(
    "MMMM Do YYYY"
  );
  updatedBooking.endDate = moment(updatedBooking.endDate).format(
    "MMMM Do YYYY"
  );
  updatedBooking.updatedAt = moment(updatedBooking.updatedAt).format(
    "MMMM Do YYYY"
  );
  updatedBooking.createdAt = moment(updatedBooking.createdAt).format(
    "MMMM Do YYYY"
  );
  if (Object.values(errorResponse.errors).length) {
    return res.status(403).json(errorResponse);
  }
  return res.status(200).json(updatedBooking);
});
module.exports = router;
