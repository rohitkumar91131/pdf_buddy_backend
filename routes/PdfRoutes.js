import express from "express";
import { uploadPdf } from "../controllers/PdfController.js";
import { upload } from "../middlewares/multerStorage.js";
import { verifyToken } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/upload",verifyToken , upload.single("file"), uploadPdf);

export default router;
