// * Create a basic server using Express.JS and heroku
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require("fs");

let notes = require("./public/assets/db.json");

// start up express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML get requests
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const createNote = req.body;
  fs.readFile("./public/assets/db.json", "utf-8", (err, data) => {
    notes = JSON.parse(data);
    createNote.id = parseInt(notes.length + 1);
    notes.push(createNote);

    console.log(notes);

    fs.writeFile("./public/assets/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(notes);
    });
  });
});

// serve index.html

app.delete("/api/notes/:id", (req, res) => {
  console.log(req.params.id);
  notes = notes.filter(function (notes) {
    return notes.id != req.params.id;
  });
  fs.writeFile("./public/assets/db.json", JSON.stringify(notes), (err) => {
    if (err) throw err;
    res.json(notes);
  });
});

// starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening" + PORT);
});
