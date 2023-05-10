const express = require("express");

const { requireAuth } = require("../../utils/auth");
const {
  Review,
  ReviewImage,
  User,
  Booking,
  Spot,
  SpotImage,
  sequelize,
} = require("../../db/models");

const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.post("/:reviewId/images", requireAuth, async (req, res, next) => {

  const { reviewId } = req.params;
  const { user } = req;
  const { url } = req.body;
  let result = {};

  // authenticate, and check on post, shouldn't create if Booking didn't exist

  const reviewData = await Review.findOne({
    where: { id: reviewId },
  });
  if (!reviewData) return res.status().json();

  const newReviewImage = await ReviewImage.create({
    reviewId,
    url,
  });

  console.log(newReviewImage);
  result.id = newReviewImage.id;
  result.url = newReviewImage.url;
console.log(result)
  return res.status(200).json();
});

module.exports = router;
