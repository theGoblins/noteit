import React from "react";
//Each individual previous note box
//with an image, delete button, and edit button

const NoteDisplay = props => (
  <div id="noteBox">
    <p> Note ID: <span>{props.note.noteID}</span></p>
    <button className = {props.note.noteID} onClick = {props.editNote}>Edit</button>
    <button  className= {props.note.noteID} onClick = {props.deleteNote}>Delete</button>
  </div>
);

export default NoteDisplay;