const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = 'YYYY-MM-DD hh:mm:ss A';

// Redis hash key
const BLACK_LISTED_TOKENS = 'blacklisted_tokens';

// Authentication token validity
const TOKEN_VALIDITY = 10 // days;


module.exports = {
  DATE_FORMAT, 
  DATE_TIME_FORMAT,
  BLACK_LISTED_TOKENS,
  TOKEN_VALIDITY,
}