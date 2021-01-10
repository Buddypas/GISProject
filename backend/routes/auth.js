const express = require("express");
const User = require("../models/user");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const router = express.Router();

/**
 * Login
 */
router.post("/login", (req, res) => {
  console.log("login called");
  console.log(req.body);
  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      console.log(user);
      bcrypt
        .compare(req.body.password, user.password)
        .then((matches) => {
          if (matches) {
          }
        })
        .catch((err) => {
          console.log("error comparing passwords");
          console.log(err);
          res.status(500).json({
            message: err,
          });
        });
    })
    .catch((err) => {
      console.log("error finding user");
      console.log(err);
      res.status(500).json({
        message: err,
      });
    });
});

/**
 * Create account
 */
router.post("/register", (req, res) => {
  console.log("register called");
  console.log(req.body);
  User.findOne({
    where: { email: req.body.email },
  })
    .then((result) => {
      if (result == null) {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            console.log(hash);
            User.create({
              username: req.body.username,
              email: req.body.email,
              password: hash,
            })
              .then((user) => {
                console.log("created user: " + user);
                res.status(201).json({
                  message: "User created!",
                  user: user,
                });
              })
              .catch((err) => {
                console.log("error creating user");
                console.log(err);
                res.status(500).json({
                  message: err,
                });
              });
          })
          .catch((err) => {
            console.log("error hashing password");
            res.status(500).json({
              error: err,
            });
          });
      } else
        res.status(403).json({
          error: "A user with the given email address already exists!",
        });
    })
    .catch((err) => {
      console.log("error finding user: " + error);
      res.status(500).json({
        error: err,
      });
    });
});
module.exports = router;
