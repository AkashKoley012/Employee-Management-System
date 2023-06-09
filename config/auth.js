exports.isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated, e.g., by verifying the session or token
    if (req.session.isAuth) {
        return next();
    }
    return res.redirect("/signin"); // Redirect to the sign-in page if not authenticated
};

exports.isAdmin = (req, res, next) => {
    // Check if the user is authenticated and admin, e.g., by verifying the session or token
    if (req.session.isAuth) {
        if (req.session.isAdmin) {
            return next();
        }
        return res.redirect("/performance");
    }
    return res.redirect("/signin");
};
