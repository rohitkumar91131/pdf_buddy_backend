import mongoose from "mongoose";

const HighlightSchema = new mongoose.Schema({
  pdfId: { type: mongoose.Schema.Types.ObjectId, ref: "PDF", required: true },
  text: { type: String, required: true },
  comment: { type: String },
  page: { type: Number, required: true }, 
  rects: [
    {
      left: { type: Number, required: true },
      top: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      page: { type: Number, required: true }, 
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Highlight", HighlightSchema);
