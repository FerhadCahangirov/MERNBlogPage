import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profileImageUrl: {
        type: String
    },
});

export default mongoose.model("User", UserSchema);