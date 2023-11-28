import mongoose, { Schema } from "mongoose";


const PostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    content: {
        type: String
    },
    imageUrl: { type: String, default: "" },
    blobName: { type: String, default: "" },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    comments: [
        {
            userId: { type: String },
            content: { type: String },
            likes: [{
                userId: { type: String }
            }],
            replyComments: [
                {
                    userId: { type: String },
                    content: { type: String },
                    likes: [{
                        userId: { type: String }
                    }],
                    createdDate: { type: Date, default: Date.now },
                }
            ],
            createdDate: { type: Date, default: Date.now },
        }
    ],
    likes: [
        {
            userId: { type: String }
        }
    ],
    tags: [
        {
            tag_id: { type: Schema.Types.ObjectId, ref: 'Tag' }
        }
    ],
    category_id: { type: Schema.Types.ObjectId, ref: 'Category' }
});

export default mongoose.model("Post", PostSchema);