const express = require("express");
const { getUserById, createUser, updateUserById, deleteUserById, login } = require("../controllers/user");

function initUserRoutes() {
  const userRouter = express.Router();
  userRouter.post('/createUser', createUser);
  userRouter.post('/login', login);
  userRouter.get('/getUser', getUserById);
  userRouter.put('/updateUser', updateUserById);
  userRouter.delete('/deleteUser', deleteUserById);
  return userRouter;
}

module.exports = initUserRoutes;
