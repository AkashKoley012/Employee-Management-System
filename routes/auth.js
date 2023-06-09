const express = require("express");
const { signupForm, signup, signinForm, signin, logout } = require("../controllers/auth");
const router = express.Router();

//router for signup page
router.get("/signup", signupForm);
router.post("/signup", signup);
//router for signin page
router.get("/signin", signinForm);
router.post("/signin", signin);
//router for logout page
router.post("/logout", logout);

module.exports = router;
