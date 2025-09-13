import express from "express";
import { check_pdf_name_in_user_dashboard, deletePdf, editPdfName, getAllPdf, sendId, sendPdfFileUrl, uploadPdf } from "../controllers/PdfController.js";
import { upload } from "../middlewares/multerStorage.js";
import { verifyToken } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/upload",verifyToken , upload.single("file"), uploadPdf);
router.get("/" , verifyToken , getAllPdf);
router.patch("/:id",verifyToken , editPdfName);
router.get("/:name" , verifyToken ,sendPdfFileUrl);
router.delete("/:id" , verifyToken , deletePdf);
router.get("/send_id/:name", sendId);
router.get("/check_name_in_user_dashboard/:name" , verifyToken , check_pdf_name_in_user_dashboard);


export default router;
