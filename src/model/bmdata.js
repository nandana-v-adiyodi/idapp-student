const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/IdApp")

const Schema = mongoose.Schema;
const BatchSchema = new Schema({

    username:String,
    password:String,
    

});

var bmdata = mongoose.model('bmdatas' , BatchSchema)
module.exports =bmdata