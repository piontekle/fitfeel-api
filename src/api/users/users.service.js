const authHelper = require("../../helpers/auth");

const User = require("../../db/models").User;

async function create(name, email, password) {
  try {
    let hashedPass = await authHelper.hashPassword(password);
    const user = await User.create({ name, email, password: hashedPass });

    if (user === null) return { msg: "DB error creating user." };

    return user;
  } catch(err) {
    console.log(err);
    return { msg: err };
  }
}

async function authorize(email, password) {
  try {
    const user = await User.findOne({ where: { email: email }});
    const errMsg = { msg: "Invalid username or password." }

    if (!user) return errMsg;
    const isAuth = await authHelper.validatePassword(password, user.password);

    return isAuth ? user : errMsg;
  } catch(err) {
    console.log(err);
    return { msg: err };
  }
}

module.exports = { create, authorize };
