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

function IsNumeric(val) {
  return Number(parseFloat(val)) === val;
}

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

  getNoteByID(req, res, next) {
    const noteID = Number(req.params.id);
    if (isNaN(noteID)) {
      next();
      return;
    }
   
    db.query(`SELECT * FROM notes WHERE id = ${noteID}`, (err, results) => {
      if (err) {
        res.status(500);
        res.send('Database error');
      } else {
        const note = results.rows[0];
        if (note) res.json(note);
        else {
          res.send(404);
        }
      }
    });
  },

  getNotesForURL(req, res, next) {
    const url = req.params.url;

    db.query(`SELECT * FROM notes WHERE url = '${url}'`, (err, results) => {
      if (err) {
        console.log(`db err: ${err}`);
        res.status(500);
        res.send("Database error (did you forget to URL encode the URL you're requesting notes for?");
      } else {
        res.json(results.rows);
      }
    });
  },

  createNote(req, res) {
    const { url, text, startPath, stopPath, startIndex, stopIndex, isHighlighted} = req.body;

    // TODO

    console.log(`startPath: ${Array.isArray(startPath)}`);
    console.log(`stopPath: ${stopPath}`);

    let q = `INSERT INTO notes (url, text, start_path, stop_path, start_index, stop_index, is_highlighted) VALUES ('${url}', '${text}', '{"html","body:eq(3)","p"}', '{"html","body:eq(4)","p"}', '${startIndex}', '${stopIndex}', '${isHighlighted}') RETURNING *`;

    console.log(q);
    db.query(q, (err, results) => {
      if (err) {
        res.status(500);
        res.send('Database error');
      } else {
        res.send(results.rows[0]);
      }
    });
  },

  deleteAllNotes(req, res) {
    db.query(`DELETE FROM notes`, (err, results) => {
      if (err) {
        res.status(500);
        res.send('Database error');
      } else {
        res.send('Success');
      }
    });
  },

  deleteNote(req, res) {
    let noteID = req.params.id;
    if (!noteID) {
      res.status(400);
      res.send('Must specify a node ID!');
    }

    db.query(`DELETE FROM notes WHERE id = ${noteID}`, (err, results) => {
      if (err) {
        res.status(500);
        res.send('Database error');
      } else {
        res.send('Success');
      }
    });
  }

  // TODO:
  // updateNote: {
  // }
};
