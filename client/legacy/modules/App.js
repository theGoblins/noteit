import Immutable from "immutable";
import axios from "axios";

export const CREATE_USER = 'CREATE_USER';
export const VERIFY_USER = 'VERIFY_USER';
export const ADD_NOTE = "ADD_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";

const defaultState = Immutable.fromJS({
  label: ["sign", "log"],
  value1: "value",
  loggedIn: false,
  username: "",
  noteList: [],

});

export function deleteNote(note_id) {
  fetch('notes/:note_id', {
    method : "DELETE",
    body : JSON.stringify({_id :note_id})
  }).then(response => {
    // console.log(response);
    return response.json()
  }).then((jsonRes) => {
    //use the jsonRes.username and remove the element from the noteList
    noteList = state.app.toJS().noteList.slice();
    for(let n = 0 ; n < noteList.length; n++){
      if(noteList[n][_id]=== note_id){
        noteList.splice(n,1);
      }
    }
  })
    return dispatch => {
      return dispatch({
        type: DELETE_NOTE,
        payload: noteList
    });
};
};

export function createUser(event, cb) {
  let load;
  event.preventDefault();
  return dispatch => {
    axios
      .post("signup", {
        name: event.target.username.value,
        password: event.target.password.value,
      })
      .then(res => {
        // console.log('res:',res);
        if (res.data === true) {
          load = true
          cb();
        } else load = false;
        // console.log('load:',load);
        dispatch({
          type: CREATE_USER,
          payload: load // expecting boolean
        });
        // return cb();
      });
  };
}

export function verifyUser(event, cb) {
  let load;
  event.preventDefault();
  return dispatch => {
    axios
      .post("login", {
        name: event.target.username.value,
        password: event.target.password.value,
      })
      .then(res => {
        // console.log('res:', res);
        if (res.data === true) {
          load = true
          cb();
        } else load = false;
        // console.log('load:',load);
        dispatch({
          type: VERIFY_USER,
          payload: load // expecting boolean
        });
        // return cb();
      });
  };
}

export function addNote(url) {
  const newNote = {
    noteID: null,
    url: null ,
    html: null,
    css: null,
    createdAt: null,
    title: null
  };
  // noteList = state.get(noteList).slice();
  fetch(url, {
    method: "POST",
    body: JSON.stringify({url : url})
  })
    .then(response => {
      return response.json();
    })
    .then(jsonRes => {
      newNote.noteID = jsonRes.noteID;
      newNote.html = jsonRes.html;
      newNote.css = jsonRes.css;
      newNote.createdAt = jsonRes.createdAt;
      newNotes.title = jsonRes.title;
    });
  noteList = state.app.toJS().noteList.slice();
  noteList.push(newNote);
  return dispatch => {
    return dispatch({
      type: ADD_NOTE,
      // post request to database ---- whatever it returns i want payload to =
      payload: {
        noteList
      }
    });
  };
}

export function editNote(note_id) {
  fetch('notes/:note_id', {
    method : "UPDATE",
    body : JSON.stringify({_id :note_id})
  }).then(response => {
    // console.log(response);
    return response.json()
  }).then((jsonRes) => {
    //use the jsonRes.username and remove the element from the noteList
    noteList = state.app.toJS().noteList.slice();
  })
  return dispatch => {
    return dispatch({
      type: EDIT_NOTE,
      payload: {
        noteList
      }
    });
  };
}

export const actions = {
  addNote,
  deleteNote,
  editNote
};

const ACTION_HANDLERS = {
  [ADD_NOTE]: (state, action) => state.set("noteList", action.payload),
  [CREATE_USER]: (state, action) => state.set("loggedIn", action.payload),
  [VERIFY_USER]: (state, action) => state.set('loggedIn', action.payload),
  [DELETE_NOTE]: (state, action) => state.set("value1", action.payload),
  [EDIT_NOTE]: (state, action) => state.set("value1", action.payload)
};

export default function appReducer(state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
