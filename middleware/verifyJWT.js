const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
   // console.log(authHeader);
  //  console.log(req.headers);
    if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.username = decoded.username;
    req.roles = decoded.roles;
    //console.log(decoded.roles);
  });
  next();
};
module.exports = verifyJWT;
