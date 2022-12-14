require("dotenv").config();
const overloadConsole = require("./library/overloadConsole");
globalThis.console = overloadConsole(globalThis.console);

const db = require("./database");
const express = require("express");
const initRoutes = require("./routes");
const morgan = require("morgan");
const redisClient = require("./cache");
const cookieParser = require("cookie-parser");

async function start() {
  db.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to database"))
  .catch((err) => {
    console.log("Error while connecting to database");
    console.log(err);
    process.exit(1);
  })

  redisClient.connect()
  .then(() => console.log('Connected to redis client'))
  .catch((err) => {
    console.log("Error while connecting to redis client");
    console.log(err);
    process.exit(1);
  })

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