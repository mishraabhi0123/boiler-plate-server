class NamedError extends Error {
  constructor(message) {
    super(message);
  }
}


class UnauthenticatedError extends NamedError {
  constructor(message, possibleReasons = []) {
    super(message);
    this.message = message;
    this.statusCode = 401;
    this.possibleReasons = possibleReasons;
  }
}

class UnauthorizedError extends NamedError {
  constructor(message, possibleReasons = []) {
    super(message);
    this.message = message;
    this.statusCode = 401;
    this.possibleReasons = possibleReasons;
  }
}

class BadRequestError extends NamedError {
  constructor(message, possibleReasons = []) {
    super(message);
    this.message = message;
    this.statusCode = 400;
    this.possibleReasons = possibleReasons;
  }
}


module.exports = {
  NamedError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError, 
}