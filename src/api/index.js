import { Router } from "express";
const routes = Router();

const users = require("./users/users.routes");

routes.use("/users", users);

routes.get("/", (req, res) => {
  res.status(200).json({ msg: "Connected!" })
})

module.exports = routes;
