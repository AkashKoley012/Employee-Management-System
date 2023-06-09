const User = require("../models/User"); // Replace with your Employee model
const CryptoJS = require("crypto-js");

exports.signupForm = (req, res) => {
    return res.render("signup"); // Render the signup form view
};

exports.signup = async (req, res) => {
    try {
        // Create a new employee
        let { name, email, password, repPassword } = req.body;
        if (password !== repPassword) {
            req.flash("error", "Password does not match");
            return res.redirect("back");
        }
        password = CryptoJS.AES.encrypt(password, process.env.SECRECT_KEY);
        const employee = await User.create({ name: name, email: email, password: password });
        return res.redirect("/signin"); // Redirect to the sign-in page
    } catch (error) {
        return res.render("404", { error: { message: error.message } });
    }
};

exports.signinForm = (req, res) => {
    res.render("signin"); // Render the sign-in form view
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the employee by username and verify the password
        const employee = await User.findOne({ email: email });
        const hashedPassword = CryptoJS.AES.decrypt(employee.password, process.env.SECRECT_KEY);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if (!employee || originalPassword !== password) {
            req.flash("error", "Invalid Username or Password");
            return res.redirect("back");
        }
        // Set the employee ID in the session or create a token for authentication
        req.session.isAuth = true;
        req.session.isAdmin = employee.isAdmin;
        req.session.userId = employee.id;
        // Redirect to the protected employee page
        if (!employee.isAdmin) {
            req.flash("success", "Login Successful");
            return res.redirect("/performance");
        }
        req.flash("success", "Login Successful");
        return res.redirect("/users");
    } catch (error) {
        return res.render("404", { error: { message: error.message } });
    }
};

exports.logout = async (req, res) => {
    try {
        req.session.destroy((error) => {
            if (error) throw error.message;
            return res.redirect("/signin");
        });
    } catch (error) {
        return res.render("404", { error: { message: error.message } });
    }
};
