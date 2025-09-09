import express from "express";
import { login, signup } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify" ,verifyToken);
export default router;
