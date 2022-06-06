const express=require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchuser');
const Notes=require('../Models/Notes');
const {body,validationResult}=require('express-validator');
//route 1: to get all the notes that user has created
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id});
        res.json(notes); 
        
    } catch (error) {
        console.error(error.message);
        return res.status(401).send("Please authenticate yourself");
        
    }
})
router.post('/addnotes',fetchuser,[
    body('title',"Add a titile using atleast 3 words").isLength({min:3}),
    body('description','Please add a description of atleast three words').isLength({min:3}),],async(req,res)=>
    {
        try {
            const {title,description,tag}=req.body;
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()});
            }
            const note=new Notes({
                title,description,tag,user:req.user.id
            })
            const savedNotes=await note.save();
            res.json(savedNotes);
            
            
        } catch (error) {
            console.error(error.message);
            return res.status(400).send("Please authenticate yourself");
        }


})
router.put('/updatenotes/:id',fetchuser, async(req,res)=>{
    try {
        const{title,description,tag}=req.body;
        const newNote={};
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}
        let note=await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note not found");
        }
        if(note.user.toString()!==req.user.id){
            return res.status(404).send("Not authorize");
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});
        
    } catch (error) {
        console.error(error.message);
        return res.status(401).json("Please authenticate yourself");
        
    }

})
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try {
        let note=await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Please authenticate");
        }
        if(note.user.toString()!==req.user.id){
            return res.status(404).send("Please authenticate");
        }
        note =await Notes.findByIdAndDelete(req.params.id);
        res.json({"success":"Note Deleted",note:note})
        
    } catch (error) {
        console.error(error.message);
        return res.status(404).json("Please a")
        
    }
})
module.exports=router

