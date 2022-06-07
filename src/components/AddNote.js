import React, { useContext,useState } from 'react'
import notecontext from '../context/notes/noteContext'

const AddNote = (props) => {
    const Name=localStorage.getItem('name');
    const [note,setnote]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addnote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:""});
        props.showAlert("Note Added successfully","success");

    }
    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})


    }
    const context = useContext(notecontext);
    const { addnote } = context;
    return (
        <form className="container mt-3">
            <h3>Hi, {Name}</h3>
            <h1>Add a Note</h1>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title} aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                <input type="text" name="description" className="form-control" onChange={onChange} value={note.description} id="description"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                <input type="text" name="tag" className="form-control" onChange={onChange} value={note.tag} id="tag"/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
        </form>
    )
}

export default AddNote