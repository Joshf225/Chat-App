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
    const emailCheck = await User.findOne({ username });
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
  } catch (err) {
    next(err);
  }
};
