const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user.js");
const authControllers = require("../controllers/auth.js");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail address already exists!");
          }
        });
      })
      .normalizeEmail(),

    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage(
        "Please enter a password with only numbers and text and at least 5 characters long."
      ),
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter a valid name."),
  ],
  authControllers.signup
);

module.exports = router;
