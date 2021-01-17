const express = require("express");
const Location = require("../models/location");
const router = express.Router();
const checkAuth = require("../shared/check-auth");
/**
 * Get all locations
 */
router.get("", (req, res) => {
  console.log("get called");
  Location.findAll()
    .then((locations) => {
      // console.log("locations: " + locations);
      res.status(200).json({
        message: "success",
        results: locations,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

/**
 * Create new location with fixed user id
 */
router.post("/add", checkAuth, (req, res) => {
  console.log("create location called");
  Location.create({
    name: req.body.name,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    description: req.body.description,
    category: req.body.category,
    creator_id: req.body.userId,
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
 * Delete location
 */
router.post("/:locationId/delete",(req,res) => {
  const locId = req.params.locationId;
  Location.destroy({
    where:{
      id:locId
    }
  }).then(result => {
    if(result > 0) res.status(200).json({
      message: "Deletion successful!"
    });
    else res.status(404).json({
      message: "No such location found!"
    });
  })
  .catch((err) => {
    msg = console.error(err.stack);
    res.status(500).json({
      message: msg,
    });
  });
})

/**
 * Rate location
 */
router.post("/rate",checkAuth, (req, res) => {
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
    console.log("oldRating: " + oldRating);
    const oldVoteCount = location.vote_count;
    console.log("oldVoteCount: " + oldVoteCount);
    const newVoteCount = oldVoteCount + 1;
    console.log("newVoteCount: " + newVoteCount);
    let newRating = (oldRating + req.body.rating) / newVoteCount;
    console.log("newRating before rounding: " + newVoteCount);
    if(Math.trunc(newRating) != newRating) newRating = Math.trunc(newRating) + 0.5;
    console.log("newRating after rounding: " + newRating);
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
