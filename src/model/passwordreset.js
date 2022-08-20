const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/IdApp")

const Schema = mongoose.Schema;
const PasswordresetSchema = new Schema({

    email:String,
    

    

});

var passworddata = mongoose.model('passworddatas' , PasswordresetSchema);
module.exports =passworddata;