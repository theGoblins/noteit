/*
(removed html, css)
  _id         serial PRIMARY KEY,
  url         TEXT,
  text        VARCHAR(255),         (renamed from 'note')
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now(),
  FOREIGN KEY (created_by) REFERENCES users (_id)
*/

require('dotenv').config();
const db = require('./../db');

module.exports = {
  getAllNotes(req, res) {
    db.query('SELECT * FROM notes;', (err, results) => {
      console.log('in notes');
      if (err) {
        console.log(err);
      } else {
        res.json(results.rows);
      }
    });
  },

  getNotesByUser(req, res) {
    const userID = req.body.user_id;

    db.query(
      `SELECT * FROM notes WHERE user_id = ${userID}`,
      (err, results) => {
        console.log('in notes');
        if (err) {
          console.log(err);
        } else {
          res.json(results.rows);
        }
      }
    );
  },

  getNoteByID(req, res) {
    const noteId = req.body.note_id;

    db.query(`SELECT * FROM notes WHERE _id = ${noteId}`, (err, results) => {
      if (err) {
        console.log('error:', err);
      } else {
        res.sed(results);
      }
    });
  },

  createNote(req, res) {
    let { _id, title, url, html, css, user_id } = req.body;
    let q = `INSERT INTO notes VALUES (${_id}, '${title}', '${url}', '${html}', '${css}', ${user_id})`;
    console.log(q);
    db.query(q, (err, results) => {
      if (err) {
        console.log('error:', err);
        res.end();
      } else {
        res.send(results);
      }
    });
  },

  deleteNote(req, res) {
    let noteID = req.body.note_id;
    db.query(`DELETE FROM notes WHERE _id = ${noteID}`, (err, results) => {
      if (err) {
        console.log('error:', err);
      } else {
        res.send(results);
      }
    });
  }

  // TODO:
  // updateNote: {
  // }
};
