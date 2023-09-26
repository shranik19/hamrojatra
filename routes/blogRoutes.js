const express = require("express");
const blogControllers = require("../controllers/blogController");
const router = express.Router();

router.get("/", blogControllers.blog_index);

router.get("/create", blogControllers.blog_create);

router.get("/:id", blogControllers.blog_details);

router.post("/", blogControllers.blog_post);

router.delete("/:id", blogControllers.blog_delete);

module.exports = router;
