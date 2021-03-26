const express = require("express");
const {getPost, createPost} = require("../controllers/post");
const {requireSignin}= require("../controllers/auth");
const {userById} = require("../controllers/user");
const {createPostValidator} = require("../validator/index");


const router = express.Router();

router.get("/" , requireSignin, getPost);
router.post("/post/new/:userId", requireSignin, createPost, createPostValidator);
router.param("userId", userById);
module.exports = router;