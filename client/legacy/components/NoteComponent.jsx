import React from "react";
import NoteDisplay from "./NoteDisplay.jsx";

const NoteComponent = props => {
  const notelist = [];
  props.noteList.map((note, idx) => {
    notelist.push(
      <NoteDisplay
        // img = {props.img}
        note = {props.note}
        editNote={props.editNote}
        noteList = {props.noteList}
        deleteNote={props.deleteNote}
        key={idx}
      />
    );
  });
  return(
      <div id= "noteDisplay">
        <h4> Previous Note </h4>
        {notelist}
      </div>
  )
};

export default NoteComponent;
