import express from "express";
import { uploadPdf } from "../controllers/PdfController.js";
import { upload } from "../config/multerStorage.js";


const router = express.Router();

router.post("/upload", upload.single("file"), uploadPdf);

export default router;
