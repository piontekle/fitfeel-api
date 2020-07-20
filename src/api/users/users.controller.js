const userService = require("./users.service");

function register(req, res, next) {
  const { name, email, password } = req.body;

  return userService.create(name, email, password)
  .then(user => {
    user.msg
    ? res.status(500).json({ msg: user.msg })
    : res.status(200).json(user);
  }).catch(err => {
    console.log(err);
    next();
  })
}

module.exports = { register };
