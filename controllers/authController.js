const User = require('../model/User');
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({
      message: "both username and password are required!",
    });
  const foundUser = await User.findOne(
    { username: username }
  );
  if (!foundUser) return res.status(401).json("username is incorrect");
  const match = await bcrypt.compare(password, foundUser.password);
  const roles = foundUser.roles;
  console.log(roles + '   authcontroller');
  if (match) {
    //jwt
    const accessToken = jwt.sign(
      {
        username: foundUser.username,
        roles: roles  
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "9920s" }
    );
    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    foundUser.refreshToken = refreshToken ;
    await foundUser.save();
   
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      Secure: true,
      maxAge: 3 * 60 * 60 * 1000
    });
    res.json({ accessToken: accessToken });
  } else {
    res.sendStatus(403);
  }
};

module.exports = handleLogin;
