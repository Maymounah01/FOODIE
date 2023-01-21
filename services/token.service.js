const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { db } = require('../models');
const { tokenTypes } = require('../config/token');
const moment = require('moment');

//generate token on sign up
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
  };
  
  //save token to database
  const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const tokenDoc = await db.tokens.create({
      token,
      user: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    });
    return tokenDoc;
  };
  
 // compare token to the one generated
  const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await db.tokens.findOne({ where: { token, type, user: payload.sub, blacklisted: false } });
    if (!tokenDoc) {
      throw new Error('Token not found');
    }
    return tokenDoc;
  };
  
  
  const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user, accessTokenExpires, tokenTypes.ACCESS);
  
    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(user, refreshTokenExpires, tokenTypes.REFRESH);
    await saveToken(refreshToken, user, refreshTokenExpires, tokenTypes.REFRESH);
  
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  };

  module.exports = {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens
  };
  