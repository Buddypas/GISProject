const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gis_db',
  password: 'postgres',
  port: 5432
});


pool.query('SELECT * FROM categories', (err, res) => {
  console.log(err, res);
  pool.end();
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

module.exports = app
