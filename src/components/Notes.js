import React, { useState, useContext, useEffect, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';
import Addnote from './Addnote';
import Noteitem from './Noteitem';

const Notes = (props) => {

    const context = useContext(NoteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Note updated successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    // This is the code for the modal which would open when we update a note

    useEffect(() => {
        const modal = document.getElementById("myModal");
        const btn = document.getElementById("myBtn");
        const span = document.getElementsByClassName("close")[0];

        const openModal = () => {
            modal.style.display = "block";
        };

        const closeModal = () => {
            modal.style.display = "none";
        };

        const closeOutsideModal = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };

        btn.addEventListener("click", openModal);
        span.addEventListener("click", closeModal);
        window.addEventListener("click", closeOutsideModal);

        return () => {
            btn.removeEventListener("click", openModal);
            span.removeEventListener("click", closeModal);
            window.removeEventListener("click", closeOutsideModal);
        };
    }, []);


    return (
        <>
            <Addnote showAlert={props.showAlert} />

            <button style={{ display: "none" }} id="myBtn" ref={ref}>Open Modal</button>

            <div id="myModal" class="modal">

                <div class="modal-content">
                    <span class="close" ref={refClose}>&times;</span>
                    <h3>Edit Note</h3>
                    <form action="" method='get'>
                        <div class="note-form">
                            <label htmlFor="etitle">Title: </label>
                            <input type="text" name="etitle" id="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                        </div>
                        <div class="note-form">
                            <label htmlFor="edescription">Description: </label>
                            <input type="text" name="edescription" id="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                        </div>
                        <div class="note-form">
                            <label htmlFor="etag">Tag: </label>
                            <input type="text" name="etag" id="etag" value={note.etag} onChange={onChange} />
                        </div>
                    </form>
                    <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" onClick={handleClick}>Update Note</button>
                </div>

            </div>

            <div className="container">
                <h2>Your Notes</h2>
                <div>
                    {notes.length === 0 && 'No notes to display'}
                </div>
                <div className='note-container'>
                    {notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                    })}
                </div>
            </div>



        </>
    )
}

export default Notes