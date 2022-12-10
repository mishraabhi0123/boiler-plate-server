const { getUserById } = require("../controllers/user");
const { decodePayload } = require("./authentication");
const { UnauthenticatedError, UnauthorizedError } = require("./errors");
const { handleError } = require("./utilities");

async function auth(req, res, next) {
  const tick = (new Date()).getTime();
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnauthenticatedError("Unauthenticated request. Token not provided.")
    }
    const tokenParts =  authorization.split(' ');
    if (!tokenParts.length !== 2 ) {
      throw new UnauthenticatedError("Invalid token provided");
    }
    
    const token = tokenParts[1];
    const payload = decodePayload(token);
    const { userId, email, validTill } = payload;
    if (moment(validTill) < moment()) {
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