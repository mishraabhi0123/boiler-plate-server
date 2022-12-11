require("dotenv").config();
const db = require("./database");
const express = require("express");
const initRoutes = require("./routes");
const morgan = require("morgan");
const redisClient = require("./cache");
const cookieParser = require("cookie-parser");

async function start() {
  db.connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected"))

  redisClient.connect()
  .then(() => console.log("Redis client connected"))

  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use(morgan('common'));

  app.get('/', (req, res) => res.send({ success: 1, message: "Service is running"}))
  app.use('/v1', initRoutes());

  const PORT = process.env.PORT || 3333;
  return app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
}

start();