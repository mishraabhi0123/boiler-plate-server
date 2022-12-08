const { NamedError } = require("./errors")

function sanitizeErrorMessageForUser(error) {
  let message = "Oops! Something went wrong. We are looking into it."
  if (error instanceof NamedError) {
    message = error.message
  }
  return message;
}

module.exports = {
  sanitizeErrorMessageForUser,
}