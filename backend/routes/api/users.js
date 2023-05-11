// backend/routes/api/users.js
const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { handleValidationErrors, validateSignup } = require("../../utils/validation");

const router = express.Router();

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  const user = await User.signup({
    email,
    username,
    password,
    firstName,
    lastName,
  });

  await setTokenCookie(res, user);

  return res.json({
    user: user,
  });
});

router.get("/", async (req, res, next) => {
  // Seed data exists in the database for spots to be returned.

  // Successful response includes each spot in the database.

  // Spot data returned includes the id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt, previewImage, and avgRating

  return res.status(200).json();
});

module.exports = router;

