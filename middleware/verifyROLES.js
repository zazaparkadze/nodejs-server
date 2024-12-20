const verifyROLES = (...args) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const allowedRoles = [...args];
    const result = req.roles
      .map((role) => allowedRoles.includes(role))
      .find((value) => value === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyROLES;
