const express=require("express")
const mongoose=require("mongoose")
const app=express()
const sport=require("./src/sports")
const animals=require("./src/animals")
try{
mongoose.connect("mongodb://127.0.0.1:27017/api")
console.log("Connected with mongoDB")
} catch (err) {
console.error(err.message);
}
app.get("/sports",()=>{
    sport.getsports()
})
app.get("/animals",()=>{
    animals.getanimals()
})
port=8080
app.listen(port,()=>{
    console.log(`Running on Port: ${ port }`)
})
