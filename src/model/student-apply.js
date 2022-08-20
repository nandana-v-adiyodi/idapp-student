const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/IdApp")

const Schema = mongoose.Schema;
const studentSchema = new Schema({
       
    name: String,
    email: String,
    phone: Number,
    photo: String,
    course:String,
    batch: String,
    startDate: String,
    endDate: String,
   status:String,
  
    

},
{
    versionKey: false
   });



var data = mongoose.model('datas' , studentSchema)
module.exports = data;