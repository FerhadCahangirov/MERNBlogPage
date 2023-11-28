import mongoose from "mongoose";


const TagSchema = new mongoose.Schema({
    content: {
        type: String
    }
});

export default mongoose.model("Tag", TagSchema);