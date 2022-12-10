const Redis = require("redis");
const redisClient = Redis.createClient({
  url: process.env.REDIS_URL
});


module.exports = redisClient;
