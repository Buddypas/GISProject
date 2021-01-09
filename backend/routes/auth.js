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
 * Authenticate
 */
router.post("/login", (req, res) => {
  console.log("login called");
  // res.setHeader('Set-Cookie','loggedIn=true; HttpOnly');
  // client.query("SELECT * FROM locations").then((result) => {
  //   results = result.rows;
  //   console.log(results);
  res.status(200).json({
    message: "success",
    loggedIn: true,
  });
  // });
});
