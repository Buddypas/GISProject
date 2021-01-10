const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();

/**
 * Authenticate
 */
router.post("/login", (req, res) => {
  console.log("login called");
  console.log(req.body);
  // res.setHeader('Set-Cookie','loggedIn=true; HttpOnly');
  // client.query("SELECT * FROM locations").then((result) => {
  //   results = result.rows;
  //   console.log(results);
  res.status(200).json({
    message: "success",
  });
  // });
});

/**
 * Create account
 */
router.post("/register", (req, res) => {
  console.log("register called");
  console.log(req.body);
  bcrypt
    .hash(req.body.password,10)
    .then((hash) => {
      console.log(hash);
      User.create({ username: req.body.username, email:req.body.email, password: hash })
        .then((msg) => {
          res.status(200).json({
            message: "success",
            result: msg,
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
        message: err,
      });
    });
});
module.exports = router;
