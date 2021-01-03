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
  let result;
  pool.query("SELECT * FROM locations").then((res) => {
    result = res;
  });

  res.status(200).json({
    message: "success",
    result:result
  });
});

module.exports = router;
