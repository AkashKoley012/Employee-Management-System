const express = require("express");
const { isAuthenticated, isAdmin } = require("../config/auth");
const router = express.Router();

router.use("/users", isAdmin, require("./employee"));
router.use("/performance", isAuthenticated, require("./performance"));
router.use("/", require("./auth"));
router.use("/", isAuthenticated, (req, res) => {
    return res.redirect("/users");
});

module.exports = router;
