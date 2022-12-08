const requestResponseWrapper = require("../library/RequestResponseWrapper");
const { validateInput } = require("../library/utilities");
const { createUserInput } = require("../validators/user");
const db = require("../database");

async function createUser(context) {
  const userData = context.body;
  validateInput(createUserInput, userData);
  const user = new db.User(userData);
  await user.save();
  return "User created successfully";
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

async function login(context) {

}

module.exports = {
  createUser: requestResponseWrapper(createUser),
  updateUserById: requestResponseWrapper(updateUserById),
  getUserById: requestResponseWrapper(getUserById),
  deleteUserById: requestResponseWrapper(deleteUserById)
}