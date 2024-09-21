const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        blogs: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Blogs"
            }
        ]
    },
    { timestamps: true }
);

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;