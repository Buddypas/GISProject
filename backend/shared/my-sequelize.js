// require('../dotenv').config();
// const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('postgres://user:nidzo81@hotmail.com:5432/gis_db',{
//   logging: (...msg) => console.log(msg)
// }) // Example for postgres

const sequelize = new Sequelize('gis_db','postgres', 'postgres', {
  host: 'localhost',
  dialect:'postgres'
});
sequelize.authenticate().then((resolve,reject) => {
  console.log("connected");
})
.catch((err) => console.log(err));

module.exports = sequelize;
