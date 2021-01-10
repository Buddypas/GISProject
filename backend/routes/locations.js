const express = require("express");
// const { Client } = require("pg");
const Location = require("../models/location");
// const sequelize = require("../shared/my-sequelize");
const router = express.Router();

// const client = new Client({
//   user: "postgres",
//   host: "localhost",
//   database: "gis_db",
//   password: "postgres",
//   port: 5432,
// });
// client.connect();

/**
 * Get all locations
 */
router.get("", (req, res) => {
  console.log("get called");
  Location.findAll()
    .then((locations) => {
      console.log("locations: " + locations);
      res.status(200).json({
        message: "success",
        results: locations,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

/**
 * Create new location with fixed user id
 */
router.post("/add", (req, res) => {
  console.log("create location called");
  Location.create({
    name: req.body.name,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    description: req.body.description,
    category: req.body.category,
    creator_id: 3,
  })
    .then((result) => {
      console.log("save result: " + result);
      res.status(200).json({
        message: "success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

/**
 * Rate location
 */
router.post("/rate", (req, res) => {
  console.log("rate location called");
  const locationId = req.body.id;
  console.log("locationId: " + locationId);
  Location.findOne({
    attributes: ["id", "name", "rating", "vote_count"],
    where: {
      id: locationId,
    },
  }).then((location) => {
    console.log("location to be rated: " + location);
    const oldRating = location.rating;
    const oldVoteCount = location.vote_count;
    const newVoteCount = oldVoteCount + 1;
    const newRating = (oldRating + req.body.rating) / newVoteCount;
    // TODO: Round new rating with 0.5 steps
    Location.update(
      {
        rating: newRating,
        vote_count: newVoteCount,
      },
      {
        where: {
          id: locationId,
        },
      }
    )
      .then(() => {
        res.status(200).json({
          message: "success",
        });
      })
      .catch((err) => {
        msg = console.error(err.stack);
        res.status(500).json({
          message: msg,
        });
      });
  });
});

module.exports = router;
