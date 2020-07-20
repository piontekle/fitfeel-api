'use strict';

import bcrypt from "bcryptjs";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
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

  User.hashPassword = (password) => {
    const salt = bcrypt.genSaltSync();

    return bcrypt.hashSync(password, salt);
  };

  User.authorize = (password, dbPassword) => {
    return bcrypt.compareSync(password, dbPassword);
  };

  return User;
}
