const db = require('./../db');

const notesTable = 'notes';
const columns = {
  id: 'id',
  url: 'url',
  text: 'text',
  startPath: 'start_path',
  stopPath: 'stop_path',
  startIndex: 'start_index',
  stopIndex: 'stop_index',
  isHighlighted: 'is_highlighted',
 // TODO: createdBy: 'created_by',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
}

function IsNumeric(val) {
  return Number(parseFloat(val)) === val;
}

module.exports = {
  getAllNotes(req, res) {
    const query = `SELECT * FROM ${notesTable};`;

    db.query(query, (err, results) => {
      if (err) res.send(500);
      else res.json(results.rows);
    });
  },

  getNoteByID(req, res, next) {
    const noteID = Number(req.params.id);

    // if 'id' param isn't a number, proceed to next middleware function
    // (i.e. if a URL is specified)
    if (isNaN(noteID)) {
      next();
      return;
    }
   
    const query = `SELECT * FROM ${notesTable} WHERE ${columns.id} = ${noteID}`;

    db.query(query, (err, results) => {
      if (err) res.send(500);
      else {
        const note = results.rows[0];
        if (note) res.json(note);
        else res.send(404);
      }
    });
  },

  getNotesForURL(req, res, next) {
    const url = req.params.url;
    const query = `SELECT * FROM ${notesTable} WHERE ${columns.url} = '${url}'`;

    db.query(query, (err, results) => {
      if (err) res.send(500);
      else res.json(results.rows);
    });
  },

  createNote(req, res) {
    const columnMapping = {};

    columnMapping[columns.url] = req.body.url;
    columnMapping[columns.text] = req.body.text;
    columnMapping[columns.startIndex] = req.body.startIndex;
    columnMapping[columns.stopIndex] = req.body.stopIndex;
    columnMapping[columns.isHighlighted] = req.body.isHighlighted;
    columnMapping[columns.startPath] = `{${req.body.startPath.join(',')}}`;
    columnMapping[columns.stopPath] = `{${req.body.stopPath.join(',')}}`;

    const insertColumns = Object.keys(columnMapping);
    const insertValues = insertColumns.map(c => `'${columnMapping[c]}'`);
    
    let query = `INSERT INTO ${notesTable} (${insertColumns.join(', ')}) VALUES (${insertValues.join(', ')}) RETURNING *`;

    db.query(query, (err, results) => {
      if (err) res.send(500);
      else res.json(results.rows[0]);
    });
  },

  deleteAllNotes(req, res) {
    const query = `DELETE FROM ${notesTable}`;

    db.query(query, (err, results) => {
      if (err) res.send(500);
      else res.send(200);
    });
  },

  deleteNote(req, res) {
    let noteID = req.params.id;

    if (!noteID) {
      res.status(400);
      res.send('Must specify a node ID!');
      return;
    }

    const query = `DELETE FROM ${notesTable} WHERE ${columns.id} = ${noteID}`;

    db.query(query, (err, results) => {
      if (err) res.send(500);
      else res.send(200);
    });
  }

};
