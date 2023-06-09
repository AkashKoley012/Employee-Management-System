const express = require("express");
const { view, create, update, remove } = require("../controllers/employee");
// const { isAdmin } = require("../config/auth");
const router = express.Router();

//router for employee
router.get("/", view);
router.post("/", create);
router.post("/update/:id", update);
router.post("/remove/:id", remove);

module.exports = router;
