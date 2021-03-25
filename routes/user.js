const express = require("express");

const {userById, allUsers, getUser, updateUser, deleteUser} = require("../controllers/user");


const router = express.Router();

//router.get("/",postController.getPost);
router.get("/users", allUsers);
router.get("/users/:userId", getUser);
router.put("/updateuser/:userId", updateUser);
router.delete("/user/:userId", deleteUser);
router.param("userId", userById);

module.exports = router;