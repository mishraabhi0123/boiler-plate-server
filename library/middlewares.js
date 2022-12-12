const moment = require("moment-timezone");
const { getUserById } = require("../controllers/user");
const { decodePayload, isBlackListed } = require("./authentication");
const { UnauthenticatedError, UnauthorizedError } = require("./errors");
const { handleError } = require("./utilities");

async function auth(req, res, next) {
  const tick = (new Date()).getTime();
  try {
    const token = req.cookies['x-auth-token'];
    if (!token) {
      throw new UnauthenticatedError("Unauthenticated request. Token not provided.")
    }

    const tokenBlackListed = await isBlackListed(token);
    if (tokenBlackListed) {
      throw new UnauthorizedError("Token blacklisted.");
    }

    const payload = decodePayload(token);
    const { userId, validTill } = payload;

    if (moment(validTill).format() < moment().format()) {
      throw new UnauthorizedError("Token expired login again");
    }

    const user = await getUserById(userId);
    req.context = { ...req.context, User: user };
    return next();

  } catch (error) {
    const response = handleError(error);
    response.processingTime_ms = (new Date()).getTime() - tick
    return res.status(error.statusCode || 500).send(response)
  }
}

module.exports = {
  auth
}