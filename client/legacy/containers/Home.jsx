import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import NoteComponent from "../components/NoteComponent.jsx";

import {
  addNote,
  deleteNote,
  editNote,
} from "../modules/App";

const mapActionCreators = {
  addNote,
  deleteNote,
  editNote,
};

const mapStateToProps = state => ({
  noteList: state.app.toJS().noteList
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    // this.EnterPrev = this.EnterPrev.bind(this);
  }
  render() {
    return (
      <div id="home">
        <Noteit editNote = {props.editNote}/>
        <NoteComponent noteList = {props.noteList} deleteNote = {props.deleteNote} editNote={props.editNote} />
        <NoteCreate noteList = {props.noteList} addNote = {props.addNote} />
      </div>
    );
  }
//   EnterPrev(e) {
//     e.preventDefault();
//     const newNote = {
//       id: Date.now(),
//       iframe: "something"
//     };
//     this.state(prevState => {
//       {
//         prevNoteList: prevState.prevNoteList.push(newNote);
//       }
//     });
//   }
}

export default connect(mapStateToProps, mapActionCreators)(Home);
