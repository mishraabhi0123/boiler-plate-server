const express = require("express");
const { getUserById, createUser, updateUserById, deleteUserById } = require("../controllers/user");

function initUserRoutes() {
  const userRouter = express.Router();
  userRouter.get('/:userId/getUser', getUserById);
  userRouter.post('/createUser', createUser);
  userRouter.put('/:userId/updateUser', updateUserById);
  userRouter.delete('/:userId/deleteUser', deleteUserById);
  return userRouter;
}

module.exports = initUserRoutes;
