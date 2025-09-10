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

export const getAllPdf = async(req,res) =>{
  try{
    const allPdfs = await Pdf.find({userId : req.user.userId});
    if(allPdfs.length === 0 ){
      return res.json({
        success : true,
        msg : "No files found",
        allPdfs : []
      })
    }
    res.json({
      success : true,
      msg : "All files retrieved",
      allPdfs
    })
  }
  catch(err){
    res.json({
      success : false,
      msg : err.message
    })
  }
}


export const editPdfName = async(req,res) =>{
  try{
    const {name} = req.body;
    console.log(name)
    const {id} = req.params;
    if(!id){
      return res.json({
        success : false,
        msg : "Id missing"
      })
    }
    if(!name || name.trim() === ""){
      return res.json({
        success : false,
        msg : "Name missing"
      })
    }
    const editedPdf = await Pdf.findByIdAndUpdate(
      id , 
      { name : name},
      { new: true }
    )
    if(!editedPdf){
      return res.json({
        success : false,
        msg : "No pdf found"
      })
    }
    res.json({
      success : true,
      msg : "name changed successfully"
    })
  }
  catch(err){
    res.json({
      success : false,
      msg : err.message
    })
  }
}