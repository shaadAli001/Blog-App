const express = require("express");
const { getAllBlogController,
    createBlogController,
    updateBlogController,
    getBlogByIdController,
    deleteBlogController,
    blogUerController } = require("../controllers/blogController");
const router = express.Router();

// get allBlog route
router.get("/allblog", getAllBlogController);

// Create route
router.post("/createblog", createBlogController);

// Update route
router.put("/updateblog/:id", updateBlogController);

// Read route
router.get("/getblog/:id", getBlogByIdController);

// Delete route
router.delete("/deleteblog/:id", deleteBlogController);

// Get user Blog
router.get("/userblog/:id", blogUerController);

module.exports = router;