const { DataTypes } = require('sequelize');
const sequelize = require('../shared/my-sequelize');

const User = sequelize.define('User', {
  // Model attributes are defined here
  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  email: {
    type: DataTypes.CHAR(320),
    unique:true,
    allowNull:false
  },
  username: {
    type: DataTypes.CHAR(120),
    unique:true,
    allowNull:false
  }
},{
  timestamps: false
});

module.exports = User;
