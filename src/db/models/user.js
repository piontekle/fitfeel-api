'use strict';

import bcrypt from "bcryptjs";

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: { msg: "must be valid email" }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {});

User.findByLogin = async login => {
  let user = await User.findOne({ where: { username: login } })

  if (!user) user = await User.findOne({ where: { email: login } });

  return user;
}

User.authorize = (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword);
}

export default User;
