const sequelize = require('sequelize');
const { database } = require('../config/config');


// const sequelizeInstance = new sequelize(database.url);
const sequelizeInstance = new sequelize(database.database, database.user, database.password, {
  host: database.host,
  dialect: database.dialect,
  pool: {
    min: 0,
    max: 100,
    acquire: 5000,
    Idle: 1000
  },
});

const db = {};


  try {
    sequelizeInstance
  .authenticate()
    .then(() => console.log(('DB connected')));
  } catch (error) {
    return res.status(error.status).send(error)
  };

  db.database = sequelizeInstance;
  db.sequelize = sequelize;

  db.user = require('./users.js')(sequelizeInstance, sequelize);
  db.tokens = require('./token.js')(sequelizeInstance, sequelize);


  module.exports = {
    db
  };