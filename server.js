import dotenv from 'dotenv';
dotenv.config();

import "./config/db.js";
import multer from 'multer';
import express from "express";
import fs from 'fs'
import authRoutes from "./routes/AuthRoutes.js";
import pdfRoutes from './routes/PdfRoutes.js';
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/pdfs", pdfRoutes);


if(!fs.existsSync("uploads")){
  console.log("Creating uploads folder")
  fs.mkdirSync("uploads")
}
app.listen(PORT, () => {
    console.log("Frontend URL:", process.env.FRONTEND_URL);
    console.log(`🚀 Server running on port ${PORT}`);
});
