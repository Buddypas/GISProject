const express = require("express");
const bodyParser = require("body-parser");

const locationRoutes = require("./routes/locations");
const categoryRoutes = require("./routes/categories");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

// forward only requests starting with first argument to the locationRoutes
app.use("/api/locations", locationRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app;
