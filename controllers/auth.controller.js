const httpStatus = require('http-status');
const catchAsync = require('../utilities/catchAsync');
const { userService, tokenService } = require('../services');


//Register as a new user
const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user.dataValues.id);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

//Login in as an existing user
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.loginUserWithCredentials(email, password);
  const tokens = await tokenService.generateAuthTokens(user.dataValues.id);
  res.send({ user, tokens });
});

module.exports = {
    register,
    login
  };