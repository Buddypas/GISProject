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
  console.log(req.body);
  const location = {
    longitude:req.body.longitude,
    latitude:req.body.latitude,
    name:req.body.name,
    description:req.body.description,
    categoryId:req.body.categoryId
  }
  const queryText = "INSERT INTO locations(longitude,latitude,name,description,category_id,creator_id) VALUES ($1,$2,$3,$4,$5,$6)";
  const queryValues = [req.body.longitude,req.body.latitude,req.body.name,req.body.description,req.body.categoryId,2];
  let msg = null;
  client.query(queryText,queryValues)
  .then(res => {
    msg = res.rows[0];
  })
  .catch(e => console.error(e.stack))
  res.status(200).json({
    message: msg
  });
});

module.exports = router;
