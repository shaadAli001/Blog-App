const mongoose = require("mongoose");

const blogschema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is requiured"],
    },
    description: {
        type: String,
        required: [true, "Title is Desription"],
    },
    image: {
        type: String,
        required: [true, "Title is Image"],
    },
    // Id will be generated
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: [true, "User Id is required"],
    }
},
    { timestamps: true }
);

const blogModel = mongoose.model("Blogs", blogschema);
module.exports = blogModel;
