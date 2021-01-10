const express = require("express");
const mySequelize = require("./shared/my-sequelize");
const bodyParser = require("body-parser");

const locationRoutes = require("./routes/locations");
const authRoutes = require("./routes/auth");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
console.log("my sequelize: " + mySequelize);

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
app.use("/api/auth", authRoutes);

module.exports = app;
