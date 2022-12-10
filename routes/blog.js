const express = require("express");

function initBlogRoutes(RRW) {
  const blogRouter = express.Router();
  blogRouter.get('/', (req, res) => res.send({ message: "Welcome to blog routes" }))
  
  return blogRouter;
}

module.exports = initBlogRoutes