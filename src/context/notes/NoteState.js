import React, { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {

    // const host = process.env.REACT_APP_HOST;

    const notesInital = []

    const [notes, setNotes] = useState(notesInital)

    // Get all the notes

    const getNotes = async () => {

        // This is the api call from backend

        const response = await fetch(`${process.env.REACT_APP_HOST}/api/notes/fetchnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    // Add a note

    const addNote = async (title, description, tag) => {

        // This is the api call from backend

        const response = await fetch(`${process.env.REACT_APP_HOST}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // Delete a Note

    const deleteNote = async (id) => {

        // This is the api call from backend

        const response = await fetch(`${process.env.REACT_APP_HOST}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        // eslint-disable-next-line
        const json = await response.json();
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes);
    }

    // Edit a Note

    const editNote = async (id, title, description, tag) => {

        // This is the api call from backend

        const response = await fetch(`${process.env.REACT_APP_HOST}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        // eslint-disable-next-line
        const json = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes))

        // How to edit in client

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;