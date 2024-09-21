const mongoose = require("mongoose");
const blogModel = require("../model/blogModel");
const userModel = require("../model/userModel");

// get all Blogs
exports.getAllBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find({});
        if (!blogs) {
            return res.status(401).send({
                success: false,
                message: "Blog Not Found!!",
            });
        }
        return res.status(200).send({
            BlogCount: blogs.length,
            success: true,
            message: "Blog Exist",
            blogs,
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error",
            error,
        });
    };
};

// Create Blog
exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please Provide All Feilds"
            });
        };
        const existingUser = await userModel.findById(user);
        // validation
        if (!existingUser) {
            res.status(400).send({
                success: false,
                message: "Unable to find user"
            })
        }
        const newBlog = new blogModel({ title, description, image, user });
        const session = await mongoose.startSession();

        session.startTransaction();
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);

        await existingUser.save({ session });
        await session.commitTransaction();
        await newBlog.save();

        return res.status(201).send({
            success: true,
            message: "Blog Created",
            newBlog,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error While Creating Blog",
            error,
        })
    }
};

// Update Blog
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        return res.status(200).send({
            success: true,
            message: "Blog Updated",
            blog
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error While Updating Blog",
            error,
        })
    }
};

// Reading Each Blog
exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(400).send({
                success: true,
                message: "Blog Not Found!",
            })
        }
        return res.status(200).send({
            success: true,
            message: "Blog Found!",
            blog
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error In Finding  Blog",
            error,
        })
    }
};

// Delete Blog
exports.deleteBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findByIdAndDelete(id).populate("user");

        // To delete the user when blog is deleted
        await blog.user.blogs.pull(blog);
        await blog.user.save();

        return res.status(200).send({
            success: true,
            message: "Blog Deleted Successflly",
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error While Deleting Blog",
            error,
        })
    }
};

// Get User Blog
exports.blogUerController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "Blogs Not Found!"
            });
        };
        return res.status(200).send({
            success: true,
            message: "Blogs",
            userBlog
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in user Blog",
            error
        })
    }
}