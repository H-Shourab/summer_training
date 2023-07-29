const note=require("../models/note")

const addNode=async (req,res)=>{
    const newNote= await new note(req.body)
    newNote.save().then(()=>{
        res.status(200)
        res.send("Added...."+newNote)
    }).catch((err)=>{
        for(let e in err.errors){
            console.log(err.errors[e].massage)
            res.status(400).send("Bad Request....")
        }
    })   
}

const findallNotes=async (req,res)=>{
    const findNotes= await note.find({})
    if(!findNotes){
        return res.status(400).send("Not Found..")
    }
    else{
        res.send(findNotes)
    }   
}

const editNote=async (req,res)=>{
    const myNote=await note.findByIdAndUpdate(req.params._id,{$set:{note:req.body.note}})
    if(!myNote){
        return res.status(400).send("not found")
    }
    res.send("Updated...")
}

const deleteNote=async(req,res)=>{
    const myNote=await note.findOneAndDelete(req.params._id)
    if(!myNote){
        return res.status(400).send("not found")
    }
    res.send("Deleted..!")
}
  
module.exports={addNode,findallNotes,editNote,deleteNote}