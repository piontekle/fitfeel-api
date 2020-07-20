import { Router } from "express";
const router = Router();
const controller = require("./users.controller");

router.post("/register", controller.register);
router.post("/sign-in", controller.authorize);

module.exports = router;
