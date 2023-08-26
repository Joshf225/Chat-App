const {
  register,
  login,
  setAvatar,
  getAllUsers,
} = require("../controllers/userController");

const router = require("express").Router();

//sending data to server
router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
//getting data from server
router.get("/allusers/:id", getAllUsers);

module.exports = router;
