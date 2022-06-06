import React, { useContext, useEffect, useState, useRef } from 'react'
import notecontext from '../context/notes/noteContext'
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const{showAlert}=props;
  const context = useContext(notecontext);
  const { notes, getNotes, editNotes } = context;
  let history=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
       getNotes();
    }
    else{
      history('/')

    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null);
  const refclose = useRef(null);
  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }
  const handleClick = () => {
    editNotes(note.id, note.etitle,note.edescription,note.etag)
    refclose.current.click();
    showAlert("Updates successfully","success");
  }
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddNote showAlert={showAlert}/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" onChange={onChange} value={note.etitle} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                  <input type="text" name="edescription" className="form-control" onChange={onChange} value={note.edescription} id="edescription" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                  <input type="text" name="etag" className="form-control" onChange={onChange} value={note.etag} id="etag" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick} >Update note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={showAlert} />

        })}

      </div>
    </>
  )
}

export default Notes