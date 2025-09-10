import Pdf from "../models/PdfModel.js";

export const uploadPdf = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        msg: "File not found",
      });
    }

    console.log(req.user)
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized: User not found",
      });
    }

    const newPdf = await Pdf.create({
      name: file.originalname,
      size: file.size,
      encoding: file.encoding,
      type: file.mimetype,
      destination: file.destination,
      path: file.path,
      filename: file.filename,
      fieldname: file.fieldname,
      userId: req.user.userId,
    });

    return res.json({
      success: true,
      msg: "File uploaded successfully",
      file: {
        id: newPdf._id,
        name: newPdf.name,
        filename: newPdf.filename,
        path: newPdf.path,
        size: newPdf.size,
        type: newPdf.type,
      },
    });
  } catch (err) {
    console.error("Upload error:", err.message);
    return res.status(500).json({
      success: false,
      msg: "Server error while uploading file",
    });
  }
};
