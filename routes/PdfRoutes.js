import express from "express";
import { editPdfName, getAllPdf, sendPdfFileUrl, uploadPdf } from "../controllers/PdfController.js";
import { upload } from "../middlewares/multerStorage.js";
import { verifyToken } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/upload",verifyToken , upload.single("file"), uploadPdf);
router.get("/" , verifyToken , getAllPdf);
router.patch("/:id",verifyToken , editPdfName);
router.get("/:id" , verifyToken ,sendPdfFileUrl)
export default router;
