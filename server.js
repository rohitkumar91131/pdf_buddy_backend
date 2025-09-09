import dotenv from 'dotenv'
import express from "express";
import "./config/db.js";
import authRoutes from "./routes/AuthRoutes.js";
import pdfRoutes from './routes/PdfRoutes.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT;

dotenv.config();

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.get("/pdfs" , pdfRoutes)


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
