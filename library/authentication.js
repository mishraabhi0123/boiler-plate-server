const jwt = require("jsonwebtoken");
const moment =  require("moment-timezone");
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

}

async function blackList(token) {

}

module.exports = {
  createToken,
  decodePayload,
}