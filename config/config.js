// const dotenv = require('dotenv');
// const path = require('path');
require('dotenv').config()

module.exports = {

  // database information.
database: {
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DIALECT,
},
   // token information
jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes:process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays:process.env.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes:process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  }
};
