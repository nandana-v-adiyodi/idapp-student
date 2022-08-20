const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/IdApp")

const Schema = mongoose.Schema;
const AdminSchema = new Schema({

    username:String,
    password:String,
  
    

});

var admindata = mongoose.model('admindatas' , AdminSchema)
module.exports =admindata