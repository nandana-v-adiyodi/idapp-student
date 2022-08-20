const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/IdApp")

const Schema = mongoose.Schema;
const StudentSchema = new Schema({

    studentname:String,
    email : String,
    gender : String,
    dob: String,
    username:String,
    password:String,
    course :String,
    batch : String,
    phonenumber:Number,
    profilepicture:Buffer,
    code:Number,
    

});

var studentdata = mongoose.model('studentdatas' , StudentSchema)
module.exports =studentdata