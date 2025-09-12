import express from "express";
import { deletePdf, editPdfName, getAllPdf, sendId, sendPdfFileUrl, uploadPdf } from "../controllers/PdfController.js";
import { upload } from "../middlewares/multerStorage.js";
import { verifyToken } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/upload",verifyToken , upload.single("file"), uploadPdf);
router.get("/" , verifyToken , getAllPdf);
router.patch("/:id",verifyToken , editPdfName);
router.get("/:name" , verifyToken ,sendPdfFileUrl);
router.delete("/:id" , verifyToken , deletePdf);
router.get("/send_id/:name", sendId);


export default router;
