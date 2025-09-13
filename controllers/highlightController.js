import Highlight from "../models/Highlight.js";

export const addHighlight = async (req, res) => {
  try {
    const { pdfId, highlights } = req.body;

    if (!pdfId || !highlights || !Array.isArray(highlights)) {
      return res.status(400).json({
        success: false,
        message: "pdfId and highlights are required",
        status: 400,
      });
    }

    const savedHighlights = await Highlight.insertMany(
      highlights.map((h) => ({ ...h, pdfId }))
    );

    return res.status(201).json({
      success: true,
      message: "Highlights added successfully",
      highlights: savedHighlights,
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
      status: 500,
    });
  }
};

export const getHighlights = async (req, res) => {
  try {
    const { pdfId } = req.params;
    const highlights = await Highlight.find({ pdfId });

    return res.status(200).json({
      success: true,
      highlights,
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
      status: 500,
    });
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

    if (!highlight) {
      return res.status(404).json({
        success: false,
        message: "Highlight not found",
        status: 404,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Highlight updated successfully",
      highlight,
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
      status: 500,
    });
  }
};

export const deleteHighlight = async (req, res) => {
  try {
    const { id } = req.params;
    const highlight = await Highlight.findByIdAndDelete(id);

    if (!highlight) {
      return res.status(404).json({
        success: false,
        message: "Highlight not found",
        status: 404,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Highlight deleted successfully",
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
      status: 500,
    });
  }
};
