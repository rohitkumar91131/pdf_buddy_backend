export const uploadPdf = async (req, res) => {
    const file = req.file;
    if(!file){
        return res.json({
            success: false,
            msg: "File not found"
        });
    }
    res.json({
        success: true,
        msg: "File uploaded successfully",
        file: {
            filename: file.filename,
            path: file.path,
            size: file.size
        }
    });
}
