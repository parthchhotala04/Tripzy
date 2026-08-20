import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const authHeader = req.header("Authorization");
  console.log("Authorization Header:", req.header("Authorization"));
  if (!authHeader) {
    return res.status(401).json({
      message: "No token",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("Decoded User: ", decoded);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
}