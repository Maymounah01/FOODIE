const { tokenTypes } = require('../config/token');

module.exports = (sequelize, dataType) => {
  const token = sequelize.define('token', {
    token: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
      index: true,
    },
    user: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    type: {
      type: dataType.ENUM(tokenTypes.REFRESH),
      allowNull: false,
    },
    expires: {
      type: dataType.DATE,
      allowNull: false,
    },
    blacklisted: {
      type: dataType.BOOLEAN,
    },
  });

  return token;
};
