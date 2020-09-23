// * Create a basic server using Express.JS and heroku
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

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
  res.json(note);
});

// // post info to respective arrays based on number of tables available
// app.post("/api/tables", function (req, res) {
//   var newTable = req.body;
//   if (tables.length <= 5) {
//     tables.push(newTable);
//     res.json(true);
//   } else {
//     waitlist.push(newTable);
//     res.json(false);
//   }
// });

// starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening" + PORT);
});
