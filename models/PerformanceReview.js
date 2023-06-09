const mongoose = require("mongoose");

// Schema for Employee
const performanceReviewSchema = new mongoose.Schema(
    {
        recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
    },
    { timestamps: true }
);

const PerformanceReview = mongoose.model("PerformanceReview", performanceReviewSchema);
module.exports = PerformanceReview;
