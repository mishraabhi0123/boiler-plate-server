const jwt = require("jsonwebtoken");
const moment =  require("moment-timezone");
const { DATE_TIME_FORMAT } = require("../constants");

function createToken(user) {
  const payload = {
    userId: user._id,
    email: user.email,
    validTill: moment().add(process.env.TOKEN_VALIDITY, 'days').format(DATE_TIME_FORMAT)
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}

function decodePayload(token) {
  if (!token) {
    throw new Error("Invalid token in decodePayload");
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
}

module.exports = {
  createToken,
  decodePayload,
}