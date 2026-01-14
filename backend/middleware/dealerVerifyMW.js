import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Get token from the header
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided, access denied!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.dealerId = decoded.id;
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};