'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');
const noteController = require('./controllers/noteController');
const accountController = require('./controllers/accountController');

const app = express();

const PORT = 5535;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

////////////////////////////// NEW ROUTES //////////////////////////////

app.get('/notes', (req, res) => {

});

app.get('/notes/:id', (req, res) => {
  res.json({
    '_id': 0,
    url: 'file:///Users/jessica/Desktop/untitled%20folder/test.html',
    text: 'This is a sample note',
    startPath: ['html', 'body:eq(3)', 'p'],
    startIndex: 26,
    stopPath: ['html', 'body:eq(4)', 'p'],
    stopIndex: 42,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    createdBy: 0,
  });
});

app.get('/notes/:url', (req, res) => {

});

app.post('/notes', (req, res) => {

});

app.delete('/notes/:id', (req, res) => {

});

app.post('/accounts/sign-in', (req, res) => {

});

app.post('/accounts/sign-up', (req, res) => {

});

////////////////////////////// OLD ROUTES //////////////////////////////

// User routing
app.post(
  '/signup',
  accountController.verifyUsername,
  accountController.createUser
);
app.post('/login', accountController.verifyUser);

// Note routing
// get all notes (for testing purposes)
app.get('/notes/all', noteController.getAllNotes);

// get one note by note id
app.get('/notes/:note_id', noteController.getNoteByID);

// get all notes belonging to one user
app.get('/notes/:user_id', noteController.getNotesByUser);

app.get('/test', (req, res) => res.sendFile(__dirname + '/test.html'));

// create a note
app.post('/notes/create', noteController.createNote);

// update a note
// app.put('/notes/:note_id', );

// delete a note
app.delete('/notes/delete', noteController.deleteNote);

app.use(express.static(path.join(__dirname, 'build')));

db.connect(err => {
  if (err) console.log('db connection error: ', err);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
