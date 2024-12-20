const User = require('../model/User');
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  //console.log(cookies);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne(
    { refreshToken: refreshToken }
  );
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        username: decoded.username,
        roles: decoded.roles
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 240 }
    );
    res.json({"accessToken": accessToken})
  });
};

module.exports = handleRefreshToken;
