require("dotenv").config();
const db = require("./database");
const express = require("express");
const initRoutes = require("./routes");
const morgan = require("morgan")

async function start() {
  db.connect(process.env.MONGODB_URL)
  .then(() => console.log("Successfully connected to database"))
  .catch((err) => console.log("Could not connect to database - ", err.message))

  const app = express();
  app.use(express.json());
  app.use(morgan('common'));

  app.get('/', (req, res) => res.send({ success: 1, message: "Service is running"}))
  app.use('/v1', initRoutes());

  const PORT = process.env.PORT || 3333;
  return app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
}

start();