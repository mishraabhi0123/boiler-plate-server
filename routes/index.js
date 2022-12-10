const express = require("express");
const initBlogRoutes = require("./blog");
const initUserRoutes = require("./user");
const requestResponseWrapper = require("../library/RequestResponseWrapper");

function initRoutes() {
  const router = express.Router();
  router.get('/', (req, res) => res.send({ success: 1, message: "Welcome to version 1 routes" }));
  router.use('/api/user', initUserRoutes(requestResponseWrapper));
  router.use('/api/blog', initBlogRoutes(requestResponseWrapper));

  return router;
}

module.exports = initRoutes;