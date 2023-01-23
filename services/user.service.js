const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { db } = require('../models');
const ApiError = require('../utilities/ApiError');


const isEmailTaken = async function (email) {
    const user = await db.user.findOne({ where: { email } });
    console.log(user);
    return !!user;
};

const isPasswordMatch = async function (password, user) {
    const comp = bcrypt.compareSync(password, user.password);
    return comp;
  };

// const createUser = async (req,res,userBody) => {
//     if (await isEmailTaken(req.body.email)) {
//         res.status(400).send({ status: 'BAD REQUEST', message: 'This email has been taken, please try again' });
//     }
//     userBody.password = bcrypt.hashSync(userBody.password, 8);
//     return db.users.create(userBody);
// };

const createUser = async (userBody) => {
    if (await isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    // eslint-disable-next-line no-param-reassign
    userBody.password = bcrypt.hashSync(userBody.password, 8);
    return db.user.create(userBody);
  };
  
const getUserByEmail = async (email) => {
    return db.user.findOne({ where: { email } });
};


const loginUserWithCredentials = async (email, password) => {
    const user = await getUserByEmail(email);
    if (!user || !(await isPasswordMatch(password, user.dataValues))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;

};

module.exports = {
    createUser,
    isPasswordMatch,
    getUserByEmail,
    loginUserWithCredentials
}