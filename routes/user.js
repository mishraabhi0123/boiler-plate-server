const express = require("express");
const { auth } = require("../library/middlewares");
const { 
  getUser, 
  createUser, 
  updateUserById, 
  deleteUserById, 
  login 
} = require("../controllers/user");


function initUserRoutes(RRW) {
  const userRouter = express.Router();
  userRouter.post('/createUser', RRW(createUser));
  userRouter.post('/login', RRW(login));
  userRouter.get('/getUser', auth, RRW(getUser));
  userRouter.put('/updateUser', auth, RRW(updateUserById));
  userRouter.delete('/deleteUser',auth, RRW(deleteUserById));
  return userRouter;
}

module.exports = initUserRoutes;
