// backend/routes/api/users.js
const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  check("username").not().isEmail().withMessage("Username is required"),

  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

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

module.exports = router;

/*
//test signup
fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": "sL9xDQHY-7vCeiZxFeOIGTV8_QrB8WyPu3Vs"
  },
  body: JSON.stringify({
    email: 'spidey@spider.man',
    username: 'Spidey',
    password: 'password'
  })
}).then(res => res.json()).then(data => console.log(data));

fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": "IsRGgJnS-6PceYdUB5S99SJjaPzpGp4kNRcA"
  },
  body: JSON.stringify({
    email: 'firestar@spider.man',
    username: 'Firestar',
    password: ''
  })
}).then(res => res.json()).then(data => console.log(data));
*/
