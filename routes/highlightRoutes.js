import express from "express";
import {
  addHighlight,
  getHighlights,
  updateHighlight,
  deleteHighlight,
} from "../controllers/highlightController.js";

const router = express.Router();

// Add multiple highlights
router.post("/", addHighlight);

// Get all highlights for a PDF
router.get("/:pdfId", getHighlights);

// Update comment of a highlight
router.put("/:id", updateHighlight);

// Delete a highlight
router.delete("/:id", deleteHighlight);

export default router;
