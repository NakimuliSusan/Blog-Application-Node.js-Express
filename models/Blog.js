import mongoose from "mongoose";

const Schema = mongoose.Schema;

// model for a blog

const blogSchema = new Schema({
    // _id:{
    //     type: String,
    // },
    title:{
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
   },
    user: {
         type: mongoose.Types.ObjectId,
         ref: "User",
         required: true,
    }
})

export default mongoose.model("Blog",blogSchema);