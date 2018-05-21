"use strict";

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./server/db");
const noteController = require("./server/controllers/noteController");
const userController = require("./server/controllers/userController");

const app = express();

const PORT = 5535;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// User routing
app.post("/signup", userController.verifyUsername, userController.createUser);
app.post("/login", userController.verifyUser);

// Note routing
// get all notes (for testing purposes)
app.get("/notes/all", noteController.getAllNotes);

// get one note by note id
app.get("/notes/:note_id", noteController.getNoteByID);

// get all notes belonging to one user
app.get("/notes/:user_id", noteController.getNotesByUser);

// create a note
app.post("/notes/create", noteController.createNote);

// update a note
// app.put('/notes/:note_id', );

// delete a note
app.delete("/notes/delete", noteController.deleteNote);

app.use(express.static(path.join(__dirname, "build")));

db.client.connect(err => {
  if (err) console.log("db connection error: ", err);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
