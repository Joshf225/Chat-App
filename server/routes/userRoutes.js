const {
  register,
  login,
  setAvatar,
  getAllUsers,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();

//sending data to server
router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
//getting data from server
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logOut);

module.exports = router;
