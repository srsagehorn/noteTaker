// * Create a basic server using Express.JS and heroku
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require("fs");

const notes = require("./public/assets/db.json");

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
  const newNote = req.body;
  fs.readFile("./public/assets/db.json", "utf-8", (err, data) => {
    let allNotes = JSON.parse(data);
    console.log(allNotes);
    allNotes.push(newNote);
    fs.writeFile("./public/assets/db.json", JSON.stringify(allNotes), (err) => {
      if (err) throw err;
      res.json(allNotes);
    });
  });
});

app.delete("/api/notes/", (req, res) => {
  const remove = req.params.title;
  notes = notes.filter((note) => {
    return note.title != remove;
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
