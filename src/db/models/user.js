'use strict';

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

  return User;
}
