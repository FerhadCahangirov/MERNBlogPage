import mongoose, { Schema } from "mongoose";

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    paragraphs: [
        {
            title: { type: String },
            text: { type: String },
        }
    ],
    tags: [
        {
            tag_id: { type: Schema.Types.ObjectId, ref: 'Tag' }
        }
    ],
    imageUrl: {
        type: String
    }
});

export default mongoose.model("Service", ServiceSchema);


