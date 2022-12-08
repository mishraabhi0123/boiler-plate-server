const express = require("express");
const initBlogRoutes = require("./blog");
const initUserRoutes = require("./user");

function initRoutes() {
  const router = express.Router();
  router.get('/', (req, res) => res.send({ success: 1, message: "Welcome to version 1 routes" }));
  router.use('/api/user', initUserRoutes());
  router.use('/api/blog', initBlogRoutes());

  return router;
}

module.exports = initRoutes;