const express = require("express");
const router = express.Router();
const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "gis_db",
  password: "postgres",
  port: 5432,
});
client.connect();

/**
 * Get all locations
 */
router.get("", (req, res, next) => {
  console.log("get called");
  let results;
  client.query("SELECT * FROM locations").then((result) => {
    results = result.rows;
    console.log(results);
    res.status(200).json({
      message: "success",
      results: results,
    });
  });
});

/**
 * Create new location with fixed user id
 */
router.post("/add", (req, res, next) => {
  console.log("create location called");
  const queryText =
    "INSERT INTO locations(longitude,latitude,name,description,category_id,creator_id) VALUES ($1,$2,$3,$4,$5,$6)";
  const queryValues = [
    req.body.longitude,
    req.body.latitude,
    req.body.name,
    req.body.description,
    req.body.categoryId,
    2,
  ];
  let msg = null;
  client
    .query(queryText, queryValues)
    .then((result) => {
      msg = result.rows[0];
      res.status(200).json({
        message: msg,
      });
    })
    .catch((e) => {
      msg = console.error(e.stack);
      res.status(500).json({
        message: msg,
      });
    });
});

module.exports = router;
