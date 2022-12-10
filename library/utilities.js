const { NamedError, BadRequestError } = require("./errors")

function sanitizeErrorMessageForUser(error) {
  let message = "Oops! Something went wrong. We are looking into it."
  if (error instanceof NamedError || error.name == 'MongoServerError') {
    message = error.message
  } else {
    console.log(error)
  }
  return message;
}

function handleError(error) {
  console.log(error)
  const response = {
    data: null,
    status: 0,
    error: sanitizeErrorMessageForUser(error)
  };

  return response;
}


function validateInput(validationSchema, objectToValidate) {
  const options = {
    errors: {
      wrap: {
        label: ''
      }
    }
  };

  const validationResult = validationSchema.validate(objectToValidate, options);
  const { error } = validationResult;
  if (error) {
    throw new BadRequestError(error.message)
  }
  return;
}

module.exports = {
  sanitizeErrorMessageForUser,
  validateInput,
  handleError,
}