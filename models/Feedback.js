const mongoose = require("mongoose");

// Schema for Employee
const feedbackSchema = new mongoose.Schema(
    {
        reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
