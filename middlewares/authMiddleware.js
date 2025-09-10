import jwt from "jsonwebtoken";

const SECRET = "your_jwt_secret";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token found, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    console.log(req.user)
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: err.message,
    });
  }
};


