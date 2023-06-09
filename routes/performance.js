const express = require("express");
const { view, assign, view_not_id, feedback } = require("../controllers/performance");
const router = express.Router();

//router for employee
router.post("/feedback/:recipientId", feedback);
router.get("/:recipientId", view_not_id);
router.post("/:recipientId/:reviewerId", assign);
router.get("/", view);

module.exports = router;
