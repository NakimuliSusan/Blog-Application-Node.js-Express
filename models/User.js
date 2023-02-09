import mongoose from "mongoose";

const Schema = mongoose.Schema;

// model for a user

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
         type: String,
         required: true,
         minlength: 6
    }
})

export default mongoose.model("User",userSchema);