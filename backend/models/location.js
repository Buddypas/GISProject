const { User } = require("./user");
const { DataTypes } = require("sequelize");
const sequelize = require("../shared/my-sequelize");

const Location = sequelize.define(
  "Location",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    latitude: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: 0,
    },
    longitude: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: 0,
    },
    name: {
      type: DataTypes.CHAR(250),
      allowNull: false,
    },
    description: {
      type: DataTypes.CHAR(1000),
    },
    category: {
      type: DataTypes.CHAR(25),
    },
    rating: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: 0,
    },
    vote_count: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: 0,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName:'locations'
  }
);

module.exports = Location;
