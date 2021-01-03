const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gis_db",
  password: "postgres",
  port: 5432,
});

/**
 * Get all locations
 */
router.get("", (req, res, next) => {
  console.log("get called");
  let results;
  pool.query("SELECT * FROM locations").then((result) => {
    results = result.rows;
    console.log(results);
    res.status(200).json({
      message: "success",
      results: results,
    });
  });
});

module.exports = router;
