const User = require("../models/User");
const CryptoJS = require("crypto-js");

exports.create = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        password = CryptoJS.AES.encrypt(password, process.env.SECRECT_KEY);
        const employee = await User.create({ name, email, password });
        req.flash("success", "Create Successful");
        return res.redirect("/users");
    } catch (error) {
        return res.render("404", { error: { message: error.message } });
    }
};

exports.view = async (req, res) => {
    try {
        let employees = await User.find({ isAdmin: false });
        return res.render("home", {
            users: employees,
            path: req.originalUrl,
            isAdmin: req.session.isAdmin,
        });
    } catch (error) {
        return res.render("404", { error: { message: error.message } });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, isAdmin } = req.body;
        const employee = await User.findByIdAndUpdate(req.params.id, { $set: { name: name, isAdmin: isAdmin === "Admin" } }, { new: true });
        req.flash("success", "Update Successful");
        return res.redirect("/users");
    } catch (error) {
        return res.render("404", { error: { message: error.message } });
    }
};

exports.remove = async (req, res) => {
    try {
        const employee = await User.findByIdAndDelete(req.params.id);
        req.flash("success", "Delete Successful");
        return res.redirect("/users");
    } catch (error) {
        return res.render("404", { error: { message: error.message } });
    }
};
