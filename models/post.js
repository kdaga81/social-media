const mongoose = require("mongoose");
//const {ObjectId} = ObjectId;
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:false,
        minlength:4,
        maxlength:150
    },
    body:{
        type:String,
        required:false,
        minlength:4,
        maxlength:2000
    },
    photo:{
        data : Buffer,
        contentType : String
    },
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    created : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("Post", postSchema);