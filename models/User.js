const mongoose = require("mongoose");

// Schema for Employee
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        rating: { type: Number, default: 0 },
        feedbackCount: { type: Number, default: 0 },
        recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
