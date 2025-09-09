import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: `Welcome, user with ID: ${req.user.id}`,
  });
});

export default router;
