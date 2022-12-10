const jwt = require("jsonwebtoken");
const moment =  require("moment-timezone");
const redisClient = require("../cache");
const { BLACK_LISTED_TOKENS, TOKEN_VALIDITY } = require("../constants");
const { UnauthorizedError } = require("./errors");

function createToken(user) {
  const payload = {
    userId: user._id,
    email: user.email,
    validTill: moment().add(process.env.TOKEN_VALIDITY, 'days').format()
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}

function decodePayload(token) {
  if (!token) {
    throw new Error("Invalid token in decodePayload");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch(err) {
    throw new UnauthorizedError("Invalid token");
  }
}

async function isBlackListed(token) {
  const blacklisted = await redisClient.GET(token);
  return blacklisted;
}

async function blackList(token) {
  await redisClient.SETEX(token, TOKEN_VALIDITY * 3600 * 24, "1");
}

module.exports = {
  createToken,
  decodePayload,

  isBlackListed,
  blackList,
}