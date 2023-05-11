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

  const reviewData = await Review.findOne({
    where: { id: reviewId },
    include: [
      { model: Spot, attributes: ["id", "ownerId"] },
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
  });
  if (!reviewData)
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  if (user.id !== reviewData.Spot["ownerId"])
    return res.status(403).json({ message: "Forbidden" });
  let urlData = reviewData.toJSON();
  if (urlData.ReviewImages.length >= 10)
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
    });

  const newReviewImage = await ReviewImage.create({
    reviewId,
    url,
  });

  result.id = newReviewImage.id;
  result.url = newReviewImage.url;

  return res.status(200).json(result);
});

module.exports = router;
