import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    const userId = req.user.userId || "guest";
    const pathUpload = path.join("uploads" , userId);
    fs.mkdirSync(pathUpload , {recursive : true});
    cb(null , pathUpload)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  }
});

export const upload = multer({ storage });
