const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken")
const path = require('path');
var bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000
const nodemailer = require('nodemailer');
require("dotenv").config();
const admindata = require("./src/model/admindata.js")
const bmdata = require("./src/model/bmdata.js")
const studentdata = require("./src/model/studentdata.js")
const passwordreset = require("./src/model/passwordreset.js")
const studentid = require("./src/model/student-apply.js")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware Fuction to verify Token send from FrontEnd
function verifyToken(req,res,next){

    if(!req.headers.authorization){
       return res.status(401).send("Unauthorized Access")
    }
    var token = req.headers.authorization.split(' ')[1];
   
   console.log(token)
   if(token == "null"){
       return res.status(401).send("Unauthorized Access")
   }

   var payload= jwt.verify(token , "secretkey")
   console.log(payload)
   if(!payload){
       return res.status(401).send("Unauthorized Access")
   }
   req.userId = payload.subject
        next()
   }


app.get("/" , (req,res)=>{
    res.send(`Server Running on PORT ${PORT}`)
});

//Register Student User//

app.post("/adduser" , (req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

    console.log(req.body)

   var user ={
        studentname:req.body.data.studentname,
        email:req.body.data.email,
        gender:req.body.data.gender,
        dob:req.body.data.dob,
        username:req.body.data.username,
        password:req.body.data.password,
        course:req.body.data.course,
        batch:req.body.data.batch,
        profilepicture:req.body.data.profilepicture,
        phonenumber:req.body.data.code +"" + req.body.data.phonenumber,
    }
    var user = new studentdata(user);
    user.save();

    //successful registration mail with all details//
    var mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'idapp3ictak@gmail.com',
            pass: "bjfgowfeizejsjwo"
        },tls: {
            rejectUnauthorized: false
                }
    });
   
    let mailDetails = {
        from: 'IdAppIctak <idapp3ictak@gmail.com>',
        to: user.email,
        subject: 'Welcome to ID App ICTAK !',
        // text: " Dear &nbsp " + user.studentname + ", \n You have successfully registered on the ICTAK IDApp. We're happy you're here. \n  Sign -in using the credentials given below: \n Email : " + user.email + "\n Username : " + user.username + "\n Password : " + user.password .  
        text : `Dear` + user.studentname +`,
         
         You have successfully registered on the ICTAK IDApp. We're happy you're here. Sign-in using the credentials given below: \n 
        ______________________________________________________
        
         Username:` +user.studentname +`
         Password:`+ user.password +`
         Email :` + user.email +`
         Phone Number :` +user.phonenumber +`
         _____________________________________________________
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
    This is a system generated mail. Please do not reply to this e-mail address. If you have any concerns about this mail, kindly contact your system administrator.Email Us: idapp3ictak@gmail.com
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
        Administrator,
        ICTAK
        ` };
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
            console.log(err);
        } else {
            console.log('Registration details sent successfully');
        }
    });
});

//Login Student//

app.post("/login" , (req,res)=>{
   
    let logindata = req.body;
    console.log(logindata.data.username)
    uname= logindata.data.username;
    pword= logindata.data.password;
    
    if(uname==null && pword==null){
        res.send({ status: false, data: 'Invalid Username and Password' })
        }
    
    else{
        studentdata.findOne({"username":logindata.data.username , "password":logindata.data.password}).then((data)=>{
        console.log(data)  
        
        if(data===null){
            res.send({ status: false, data: 'Invalid Username and Password' })
          
        }else if(data.username === uname && data.password === pword){
            let payload = {subject:uname+pword};
            let token = jwt.sign(payload , "secretkey")
            res.send({status: true , token})
           
        }else{
             res.send({ status: false, data: 'Invalid Username and Password' })
    
        }
      })
     }
    })

//Login admin//

app.post("/adminlogin" , (req,res)=>{
   
    let logindata = req.body;
    console.log(logindata.data.username)
    uname= logindata.data.username;
    pword= logindata.data.password;
    
    if(uname==null && pword==null){
        res.send({ status: false, data: 'Invalid Username and Password' })
        }
    
    else{
        admindata.findOne({"username":logindata.data.username , "password":logindata.data.password}).then((data)=>{
        console.log(data)  
        
        if(data===null){
            res.send({ status: false, data: 'Invalid Username and Password' })
          
        }else if(data.username === uname && data.password === pword){
            let payload = {subject:uname+pword};
            let token = jwt.sign(payload , "secretkey")
            res.send({status: true , token})
           
        }else{
             res.send({ status: false, data: 'Invalid Username and Password' })
    
        }
      })
     }
    })



//Login Batch Manager//

app.post("/bmlogin" , (req,res)=>{
   
    let logindata = req.body;
    console.log(logindata.data.username)
    uname= logindata.data.username;
    pword= logindata.data.password;
    
    if(uname==null && pword==null){
        res.send({ status: false, data: 'Invalid Username and Password' })
        }
    
    else{
        bmdata.findOne({"username":logindata.data.username , "password":logindata.data.password}).then((data)=>{
        console.log(data)  
        
        if(data===null){
            res.send({ status: false, data: 'Invalid Username and Password' })
          
        }else if(data.username === uname && data.password === pword){
            let payload = {subject:uname+pword};
            let token = jwt.sign(payload , "secretkey")
            res.send({status: true , token})
           
        }else{
             res.send({ status: false, data: 'Invalid Username and Password' })
    
        }
      })
     }
    })

//forgot password sending mails//
app.post('/sendmail',(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
   
    console.log(req.body)

    var user={
        email: req.body.data.email,
    }
    
   
    var mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'idapp3ictak@gmail.com',
            pass: "bjfgowfeizejsjwo"
        },tls: {
            rejectUnauthorized: false
                }
    });
  
   // Mail options
   let mailOptions = {
     from: "IdAppIctak <idapp3ictak@gmail.com>",
     to: user.email,
     subject: "ICTAK Reset Password-ID Generator-reg.",
     text: 
     `Dear Student,
 
 We have provided a temporary login credentials for you! Kindly requesting you to reset your password in RESET PASSWORD form. 
______________________________________

  Password: Idappictak@123 
_______________________________________

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
This is a system generated mail. Please do not reply to this e-mail address. If you have any concerns about this mail, kindly contact your system administrator.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 Administrator,
 ICTAK`
 
 };
    mailTransporter.sendMail(mailOptions, function(err, data) {
    if(err) {
        console.log('Error Occurs');
        console.log(err);
    } else {
        console.log('Email sent successfully');
    }
    });
});

   
   
   




app.post("/register", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Method:GET,POST,PUT,DELETE");

    studentid.find({email:req.body.data.email}).then((data)=>{
        if(data.length!=0)
         
           studentid
       .findOneAndUpdate(
         { email: req.body.data.email },
         {
            $set : {
             name:req.body.data.name,
             email:req.body.data.email,
             phone:req.body.data.phone,
             photo:req.body.data.photo,
             course:req.body.data.course,
             batch:req.body.data.batch,
             startDate:req.body.data.startDate,
             endDate:req.body.data.endDate,
            status: "Pending",
           
           }
     
         }
       )
       .then((data) => {
         res.send(data);
       });
     
     
       else{
         res.send(null)
       }
     
      })
     
      });
      app.get("/register", (req, res) => {
       studentid
         .findOne({ status: req.params.status })
         .then((data) => {
           res.send(data);
         });
     });
     
      app.get("/register", (req, res) => {
       studentid
         .findOne({ _id: req.params.id })
         .then((data) => {
           res.send(data);
         });
     });
     
     
     
     



app.listen( PORT , (req,res)=>{
    console.log(`Server Running on PORT ${PORT}`)
})