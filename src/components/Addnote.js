import React, { useState, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { toast } from 'react-hot-toast';

const Addnote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        toast.success('Note added successfully');
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="header">
                <div>
                    <div className="container" style={{marginTop: "20px"}}>
                        <h2>Add a Note</h2>
                        <form action="" method='get'>
                            <div class="note-form">
                                <label for="name">Title: </label>
                                <input type="text" name="title" id="title" value={note.title} onChange={onChange} minLength={5} required />
                            </div>
                            <div class="note-form">
                                <label for="name">Description: </label>
                                <input type="text" name="description" id="description" value={note.description} onChange={onChange} minLength={5} required />
                            </div>
                            <div class="note-form">
                                <label for="name">Tag: </label>
                                <input type="text" name="tag" id="tag" value={note.tag} onChange={onChange} required />
                            </div>

                            <button type="submit" disabled={note.title.length < 5 || note.description.length < 5} onClick={handleClick} className='btn-2' style={{marginTop: "15px"}}>Add Note</button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Addnote