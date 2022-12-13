const bcrypt = require("bcrypt");
/**
 * The encryptPassword function is an asynchronous function that uses the bcrypt library to hash a given password. The function accepts a password argument, which is the password that needs to be hashed.
 * @param {*} password 
 * @returns 
 */
async function encryptPassword(password) {
  if (!password) {
    throw new NamedError("Invalid password")
  }
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

/**
 * The comparePassword function is an asynchronous function that uses the bcrypt library to compare a given password to a hashed password. The function accepts two arguments: password, which is the plain-text password to be compared, and hash, which is the hashed password to compare against.
 * @param {*} password 
 * @param {*} hash 
 * @returns 
 */
async function comparePassword(password, hash) {
  console.log({ password, hash })
  if (!(password && hash)) {
    return false;
  }
  return bcrypt.compare(password, hash);
}

module.exports = {
  encryptPassword,
  comparePassword
}