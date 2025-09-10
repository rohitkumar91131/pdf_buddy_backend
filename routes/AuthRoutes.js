import express from "express";
import { login, signup, verified } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify" ,verifyToken ,verified) ;
export default router;
