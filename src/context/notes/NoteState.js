import NoteContext from "./noteContext";
import React, { useState } from 'react';
const NoteState = (props) => {
    const host="http://localhost:5000";
    const notesIntitial = [];
    const [notes, setnotes] = useState(notesIntitial)

    const getNotes=async()=>{
        const response=await fetch(`${host}/api/notes/fetchallnotes`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            }
        });
        const json=await response.json();
        setnotes(json);
    }

    const addnote = async(title,description,tag) => {
        const response=await fetch(`${host}/api/notes/addnotes`,{
            method:'POST',
            headers:{
               'Content-type':'application/json',
               "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const note=await response.json();
        setnotes(notes.concat(note))
    }
    const deletenotes = async(id) => {
        const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
        });
        const json=response.json();
        console.log(json);
        console.log("Deleting the node"+id);
        const newNotes=notes.filter((note)=>{
            return note._id!==id
        })
        setnotes(newNotes);
    }
    const editNotes = async (id,title,description,tag) => {
        const response=await fetch(`${host}/api/notes/updatenotes/${id}`,{
            method:'PUT',
            headers:{
                'Content-type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body : JSON.stringify({title,description,tag})
        });
        const json=await response.json();
        console.log(json);
        let newNotes=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if(element._id===id){
                newNotes[index].title=title;
                newNotes[index].description=description;
                newNotes[index].tag=tag;
                break;
            }   
        }
        setnotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addnote, deletenotes, editNotes ,getNotes}}>
            {props.children}
        </NoteContext.Provider>

    )
}
export default NoteState;