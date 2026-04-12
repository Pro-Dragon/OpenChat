import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    username : String,
    message : String
});

export default mongoose.model("Message", messageSchema);