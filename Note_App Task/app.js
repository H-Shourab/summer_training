const express = require("express")
const app = express()
const morgan = require("morgan")
app.use(morgan("dev"))
const cors = require("cors")
app.use(cors())
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
(async() => {
  try {
     await mongoose.connect("mongodb://127.0.0.1:27017/project2");
     console.log("Connected with mongoDB")
  } catch (err) {
    console.error(err.message);
  }
})()
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//routes
const user = require("./routes/user")
//const userr=require("./models/user")
const note =require("./routes/note")
//const notee =require("./models/note")

// Injections
app.use("/user", user)
app.use("/note",note)
const path  = require("path")

app.get("/note",(req,res)=>{
  res.sendFile(path.join(__dirname,'public/note.html'))
})

app.post("/note",async(req,res)=>{
  const newStudent=await new notee({note:req.body.note})
   newStudent.save().then(()=>{
     //res.status(200).send("sucess")
     res.redirect('/')
   }).catch((err)=>{
     for(let e in err.errors){
         console.log(err.errors[e].massage)
         //res.status(400).send("Bad Request....")
         res.redirect('/note')
     }
   })
})
/////////////////////////////////////////////////////////
app.get("/signup",(req,res)=>{
  res.sendFile(path.join(__dirname,'public/signup.html'))
})

app.post("/signup",async(req,res)=>{
  const newStudent=await new userr({fullname:req.body.name,email:req.body.email,password:req.body.password,role:req.body.role})
   newStudent.save().then(()=>{
     //res.status(200).send("sucess")
     res.redirect('/note')
   }).catch((err)=>{
     for(let e in err.errors){
         console.log(err.errors[e].massage)
         //res.status(400).send("Bad Request....")
         res.redirect('/signup')
     }
   })
})
//////////////////////////////////////////////////////////////////////

//get login page
app.get("/login",(req,res)=>{
  res.sendFile(path.join(__dirname,'public/login.html'))
})
//login
const bcrypt=require("bcrypt")
app.post('\login',async(req,res)=>{
  const std=await userr.findOne({email:req.body.email}).exec()
  //console.log(std)
  if(std){
      const compare=await bcrypt.compare(req.body.password,std.password)
      if(compare){
          res.redirect('/note')
      }
      else{
          res.redirect('/login')
      }
  }else{
      res.redirect('/signup')
  }
})
/*****************************************************************/
/*app.post('\login',async (req, res) => {
    try {
        var admin = await userr.findOne({ email: req.body.email }) 
        if (!admin) {
          res.redirect('/signup')
        }
        const passwordMatch = await bcrypt.compare(req.body.password, admin.password);
        if (!passwordMatch) {
          res.redirect('/login')
        }
        else{ res.redirect('/note')}
    } catch (err) {
        return res.send('Something went wrong');
    }
})*/


app.get("/",(req,res)=>{
  res.end("donne")
})


// The NodeJS App is running on port 3000
const port = 4000;
app.listen(port, () => {
    console.log(`Running on Port: ${ port }`)
})


