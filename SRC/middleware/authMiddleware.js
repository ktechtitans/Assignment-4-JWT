const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


const authenticateJWT = (req, res, next) => {
  // Extracting the token from the Authorization header
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  // Verify the token's validity using the secret key
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.userId = decoded.userId;
    next();  //passing request to the next middleware or routes handlers
  });
};

module.exports = authenticateJWT;
