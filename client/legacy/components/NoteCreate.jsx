import React from 'react';

const NoteCreate = props => {
    //*** Bottom Part of the Home Page */
    //Here is the "New Note Creation" Section
    //user will need to enter the url in the input box created below
    //user will need to press enter key to create a new note
    //in the eventhandler "addNote", we might need a fetch request to get to the next page to a new iframe
    return(
        <div id="noteCreator">
        <label>New URL: </label>
        <input type = "text" name="newUrl" placeholder="https://...."/>
        <button onClick = { () => props.addNote(document.getElementById(" ").value)}> Create New Note</button>
        </div>
    );
}

export default NoteCreate;