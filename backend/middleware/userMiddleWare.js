import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // 1. Get token from the Authorization header (Format: Bearer <token>)
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // 2. Check if token exists
  if (!token) {
    return res.status(403).json({ 
      success: false, 
      message: "Access Denied: No token provided!" 
    });
  }

  try {
    // 3. Verify the token using your Secret Key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach ALL user data to the request object
    // These names (id, name, role) MUST match what you put in jwt.sign() during Login
    req.userId = decoded.id;
    req.userName = decoded.name;
    req.userRole = decoded.role;

    // 5. Move to the next function (the Controller)
    next(); 
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid or expired token. Please login again." 
    });
  }
};