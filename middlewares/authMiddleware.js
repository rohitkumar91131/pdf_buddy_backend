import jwt, { decode } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token found, Please login again",
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    if(!decoded){
      return res.json({
        success : false,
        msg : "Token expired , Please login again"
      })
    }
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    console.log(err.message)
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: err.message,
    });
  }
};


