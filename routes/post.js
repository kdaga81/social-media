const express = require("express");
const {getPost, createPost, postsByUser, postById, isPoster, deletePost} = require("../controllers/post");
const {requireSignin}= require("../controllers/auth");
const {userById} = require("../controllers/user");
const {createPostValidator} = require("../validator/index");


const router = express.Router();

router.get("/" , requireSignin, getPost);
router.post("/post/new/:userId", requireSignin, createPost, createPostValidator);
router.get("/posts/by/:userId", requireSignin ,postsByUser);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.param("userId", userById);
router.param("postId", postById);
module.exports = router;