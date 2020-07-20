const User = require("../../db/models").User;

async function create(name, email, password) {
  try {
    const hashedPass = User.hashPassword(password);

    const user = await User.create({ name, email, password: hashedPass });

    if (user === null) return { msg: "DB error creating user." };

    return user;
  } catch(err) {
    console.log(err);
    return { msg: err };
  }
}

module.exports = {
  create
};
