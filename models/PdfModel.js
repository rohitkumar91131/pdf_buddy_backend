import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    }, 
    size: { 
        type: Number, 
        required: true 
    }, 
    encoding: { 
        type: String 
    },            
    type: { 
        type: String, 
        required: true 
    }, 
    destination: {
        type: String 
        
    },      
    path: { 
        type: String, 
        required: true 
    }, 
    filename: { 
        type: String, 
        required: true 
    }, 
    fieldname: { 
        type: String 
    },            
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    }, 
  },
  { timestamps: true }
);

export default mongoose.model("Pdf", pdfSchema);
