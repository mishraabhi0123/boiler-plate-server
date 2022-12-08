const { UnauthenticatedError } = require("../library/errors");
const requestResponseWrapper = require("../library/RequestResponseWrapper");

async function createUser(context) {
  throw new UnauthenticatedError("Please login to continue.")
  return context;
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