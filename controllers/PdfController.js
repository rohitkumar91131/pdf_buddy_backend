import Pdf from "../models/PdfModel.js";
import fs from "fs";

export const uploadPdf = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        msg: "File not found",
        status: 400,
      });
    }

    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized: User not found",
        status: 401,
      });
    }

    const isPdfExits = await Pdf.findOne({ name: file.originalname });
    if (isPdfExits) {
      return res.status(409).json({
        success: false,
        msg: "Name already present in your dashboard. Please try changing name",
        status: 409,
      });
    }

    const newPdf = await Pdf.create({
      name: file.originalname,
      size: file.size,
      encoding: file.encoding,
      type: file.mimetype,
      destination: file.destination,
      pdfUrlPath: file.path,
      filename: file.filename,
      fieldname: file.fieldname,
      userId: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      msg: "File uploaded successfully",
      file: {
        id: newPdf._id,
        name: newPdf.name,
        filename: newPdf.filename,
        pdfUrlPath: newPdf.pdfUrlPath,
        size: newPdf.size,
        type: newPdf.type,
      },
      status: 201,
    });
  } catch (err) {
    console.error("Upload error:", err.message);
    return res.status(500).json({
      success: false,
      msg: "Server error while uploading file",
      error: err.message,
      status: 500,
    });
  }
};

export const getAllPdf = async (req, res) => {
  try {
    const allPdfs = await Pdf.find({ userId: req.user.userId });
    if (allPdfs.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "No files found",
        allPdfs: [],
        status: 200,
      });
    }
    return res.status(200).json({
      success: true,
      msg: "All files retrieved",
      allPdfs,
      status: 200,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
      status: 500,
    });
  }
};

export const editPdfName = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        msg: "Id missing",
        status: 400,
      });
    }
    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        msg: "Name missing",
        status: 400,
      });
    }

    const editedPdf = await Pdf.findByIdAndUpdate(
      id,
      { name: name },
      { new: true }
    );
    if (!editedPdf) {
      return res.status(404).json({
        success: false,
        msg: "No pdf found",
        status: 404,
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Name changed successfully",
      status: 200,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
      status: 500,
    });
  }
};

export const sendPdfFileUrl = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({
        success: false,
        msg: "Name missing",
        status: 400,
      });
    }

    const pdf = await Pdf.findOne({ name });
    if (!pdf) {
      return res.status(404).json({
        success: false,
        msg: "Pdf not found",
        status: 404,
      });
    }

    const filePath = pdf.pdfUrlPath;
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return res.status(500).send("Error reading file.");
      }
      res.setHeader("Content-Type", "application/pdf");
      res.send(data);
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
      status: 500,
    });
  }
};

export const deletePdf = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      msg: "Missing Id",
      status: 400,
    });
  }
  try {
    const pdf = await Pdf.findByIdAndDelete(id);
    if (!pdf) {
      return res.status(404).json({
        success: false,
        msg: "Pdf not found",
        status: 404,
      });
    }

    const filePath = pdf.pdfUrlPath;
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      return res.status(200).json({
        success: true,
        msg: "Pdf and file deleted successfully",
        status: 200,
      });
    } else {
      return res.status(200).json({
        success: true,
        msg: "Pdf deleted, but file not found on disk",
        status: 200,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message || "Server error",
      status: 500,
    });
  }
};

export const sendId = async (req, res) => {
  const { name } = req.params;
  try {
    const pdf = await Pdf.findOne({ name });
    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
        status: 404,
      });
    }
    return res.status(200).json({
      success: true,
      _id: pdf._id,
      status: 200,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
      status: 500,
    });
  }
};

export const check_pdf_name_in_user_dashboard = async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.status(400).json({
      success: false,
      msg: "Missing name",
      status: 400,
    });
  }
  try {
    const isExists = await Pdf.findOne({
      name: name,
      userId: req.user.userId,
    });
    if (isExists) {
      return res.status(409).json({
        success: false,
        msg: "Please try another name, pdf of this name already exists in your dashboard",
        status: 409,
      });
    }
    return res.status(200).json({
      success: true,
      msg: "No pdf name found",
      status: 200,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
      status: 500,
    });
  }
};
