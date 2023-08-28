const User = require("../model/userModel");
const bcrypt = require("bcrypt");

//bvrypt is for encrypting our passwords

module.exports.register = async (req, res, next) => {
  try {
    //this is to post registration details(details to post in req)
    // console.log(req.body)
    const { username, email, password } = req.body;
    //checking if each data object is already used
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    //inserting items into database
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    //deleting the password because wew dont need to store it
    delete user.password;
    //returning true back to user from the database assuming everything was correct when registering
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    //this is to post registration details(details to post in req)
    const { username, password } = req.body;
    //checking if each data object is already used
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect username or password", status: false });
    //comparing the passwords sent from the frontend with the password in database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect username or password", status: false });
    delete user.password;

    //returning true back to user from the database assuming everything was correct when registering
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    //select all users not including the current user
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
