import { Router } from "express";
const router = Router();
const controller = require("./users.controller");

router.post("/register", controller.register);

module.exports = router;
