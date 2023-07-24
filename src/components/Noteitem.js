import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { toast } from 'react-hot-toast';

const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props
    return (
        <>
            <div className='card-container'>

                <h4>{note.title}</h4>
                <p>{note.description}</p>

                <button type="button" onClick={() => { updateNote(note) }} style={{ marginRight: "5px" }}>Edit Note</button>
                <button type="button" onClick={() => { deleteNote(note._id); toast.success('Note deleted successfully'); }}>Delete Note</button>
            </div>

        </>
    )
}

export default Noteitem