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
client.connect()

/**
 * Get all categories
 */
router.get("", (req, res, next) => {
  console.log("get categories called");
  let results;
  client.query("SELECT * FROM categories").then(result => {
    results = result.rows;
    console.log(results);
    res.status(200).json({
      message: "success",
      results: results,
    });
  });
});

module.exports = router;
