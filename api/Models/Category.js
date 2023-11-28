import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    content: {
        type: String
    }
});

export default mongoose.model("Category", CategorySchema);
