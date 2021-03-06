const mongoose = require("mongoose");
const uuidv1 = require("uuid");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    hashed_password : {
        type : String,
        required:true
    },
    salt : String,
    created : {
        type : Date,
        default : Date.now
    },
    updated : Date
});

userSchema.virtual("password")
.set(function(password){
    //create temporary variable to store password
    this._password = password;

    //generate timestamp
    this.salt = uuidv1.v1();

    //encrypt password
    this.hashed_password = this.encryptPassword(password);
})
.get(function(){
    return this._password;
});

//methods

userSchema.methods = {
    authenticate : function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword : function(password){
        if(!password)
        return "";
        try{
            return crypto 
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        }
        catch(err){
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);