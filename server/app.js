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

////////////////////////////// ROUTING CONFIG //////////////////////////////

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  res.send("🧐 Whatcha doin' here? (use API routes)");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

////////////////////////////// ROUTES //////////////////////////////

app.get('/notes', noteController.getAllNotes);
app.get('/notes/:id', noteController.getNoteByID);
app.get('/notes/:url', noteController.getNotesForURL);

app.post('/notes', noteController.createNote);

app.delete('/notes', noteController.deleteAllNotes);
app.delete('/notes/:id', noteController.deleteNote);

// TODO:
// app.post('/accounts/sign-in', accountsController.signIn);
// app.post('/accounts/sign-up', accountsController.signUp);


////////////////////////////// BUILD/SERVER //////////////////////////////

app.use(express.static(path.join(__dirname, 'build')));

db.connect(err => {
  if (err) console.log('db connection error: ', err);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
