const jwt = require("jsonwebtoken");
// MIDDLEWARE FOR TOKEN AUTH
const verifyToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;
    if (!authorization) throw new Error("Please login");
    const { _id } = jwt.verify(authorization, process.env.JWT_SECRET);
    req.userId = _id;
    next();
  } catch (err) {
    res.send(err.message);
  }
};
module.exports = verifyToken;