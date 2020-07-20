import bcrypt from "bcryptjs";

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = { hashPassword, validatePassword };
