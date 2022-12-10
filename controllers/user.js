const db = require("../database");
const requestResponseWrapper = require("../library/RequestResponseWrapper");
const { validateInput } = require("../library/utilities");
const { createUserInput, loginInput } = require("../validators/user");
const { BadRequestError } = require("../library/errors");
const { comparePassword } = require("../library/passwords");
const { createToken } = require("../library/authentication");

async function createUser(context) {
  const userData = context.body;
  validateInput(createUserInput, userData);
  const user = new db.User(userData);
  await user.save();
  return "User created successfully";
}

async function login(context) {
  const { email, password } = context.body;
  validateInput(loginInput, { email, password });
  const user = await db.User.findOne({ email });
  if (!user) {
    throw new BadRequestError("Incorrect email or password");
  }
  const passwordHash = user.password;
  const valid = await comparePassword(password, passwordHash);
  if (!valid) {
    throw new BadRequestError(`Incorrect email or password`)
  }
  const token = createToken(user);
  return { token };
}

async function updateUserById(context) {
  return context;
}

async function getUserById(context) {
  return context;
}

async function deleteUserById(context) {
  return context;
}

async function getUserById(userId) {
  if (!userId) {
    throw new BadRequestError("Invalid userId");
  }

  const user = await db.User.findById({ _id: userId });
  return user;
}

module.exports = {
  createUser: requestResponseWrapper(createUser),
  login: requestResponseWrapper(login),
  updateUserById: requestResponseWrapper(updateUserById),
  getUserById: requestResponseWrapper(getUserById),
  deleteUserById: requestResponseWrapper(deleteUserById)
}