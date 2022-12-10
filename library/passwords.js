const bcrypt = require("bcrypt");

async function encryptPassword(password) {
  if (!password) {
    throw new NamedError("Invalid password")
  }
  const hash = await bcrypt.hash(password, 10);
  return hash;
}


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