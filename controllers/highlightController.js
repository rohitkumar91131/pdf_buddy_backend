import Highlight from "../models/Highlight.js";


export const addHighlight = async (req, res) => {
  try {
    const { pdfId, highlights } = req.body;

    if (!pdfId || !highlights || !Array.isArray(highlights))
      return res.status(400).json({ message: "pdfId and highlights required" });

    const savedHighlights = await Highlight.insertMany(
      highlights.map((h) => ({ ...h, pdfId }))
    );

    res.status(201).json(savedHighlights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getHighlights = async (req, res) => {
  try {
    const { pdfId } = req.params;
    const highlights = await Highlight.find({ pdfId });
    res.json(highlights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


export const updateHighlight = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const highlight = await Highlight.findByIdAndUpdate(
      id,
      { comment, updatedAt: Date.now() },
      { new: true }
    );

    if (!highlight) return res.status(404).json({ message: "Highlight not found" });

    res.json(highlight);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


export const deleteHighlight = async (req, res) => {
  try {
    const { id } = req.params;
    const highlight = await Highlight.findByIdAndDelete(id);

    if (!highlight) return res.status(404).json({ message: "Highlight not found" });

    res.json({ message: "Highlight deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
