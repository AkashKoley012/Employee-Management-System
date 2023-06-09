const User = require("../models/User");
const PerformanceReview = require("../models/PerformanceReview");
const Feedback = require("../models/Feedback");

module.exports.view = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId).populate("recipients");
        const performanceReview = await PerformanceReview.findOne({ recipientId: req.session.userId }).populate("feedbacks");
        let feedbacks = [];
        if (performanceReview) feedbacks = performanceReview.feedbacks;
        for (let i = 0; i < feedbacks.length; i++) feedbacks[i] = await feedbacks[i].populate("reviewerId");
        return res.render("performance", {
            path: req.originalUrl,
            isAdmin: req.session.isAdmin,
            user: user,
            reviews: user.recipients,
            feedbacks: feedbacks,
        });
    } catch (error) {
        return res.render("404", { error: { message: error.message } });
    }
};

module.exports.view_not_id = async (req, res) => {
    try {
        const performanceReview = await PerformanceReview.findOne({ recipientId: req.params.recipientId });
        let participants = [];
        if (performanceReview) participants = performanceReview.participants;
        const employees = await User.find({ _id: { $ne: req.params.recipientId, $nin: participants }, isAdmin: false });
        return res.render("home", {
            users: employees,
            path: req.originalUrl,
            isAdmin: req.session.isAdmin,
        });
    } catch (error) {
        return res.render("404", { error: { message: error.message } });
    }
};

module.exports.assign = async (req, res) => {
    try {
        const recipientId = req.params.recipientId;
        const reviewerId = req.params.reviewerId;
        let recipient = await PerformanceReview.findOne({ recipientId: recipientId });
        if (!recipient) recipient = await PerformanceReview.create({ recipientId: recipientId });
        const updateRecipient = await PerformanceReview.findByIdAndUpdate(recipient.id, { $addToSet: { participants: reviewerId } }, { new: true });
        const updateUser = await User.findByIdAndUpdate(reviewerId, { $addToSet: { recipients: recipientId } }, { new: true });
        return res.redirect("back");
    } catch (error) {
        return res.render("404", { error: { message: error.message } });
    }
};

module.exports.feedback = async (req, res) => {
    try {
        const recipientId = req.params.recipientId;
        const reviewerId = req.session.userId;
        const { rating, content } = req.body;
        const feedback = await Feedback.create({ reviewerId, rating, content });
        const performanceReview = await PerformanceReview.findOne({ recipientId });
        await PerformanceReview.findByIdAndUpdate(performanceReview.id, { $pull: { participants: reviewerId }, $addToSet: { feedbacks: feedback.id } }, { new: true });
        await User.findByIdAndUpdate(reviewerId, { $pull: { recipients: recipientId } }, { new: true });
        await User.findByIdAndUpdate(recipientId, { $inc: { rating: rating, feedbackCount: 1 } }, { new: true });
        return res.redirect("back");
    } catch (error) {
        return res.render("404", { error: { message: error.message } });
    }
};
