// implement your API here

const express = require("express");
const db = require("./data/db");
const server = express();
const cors = require("cors");
server.use(express.json());
server.use(cors());

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({ success: true, users });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "The users information could not be retrieved."
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json({ user, success: true });
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ success: false, message: "The user could not be removed." });
    });
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  const newUser = { name, bio };
  if (!name || !bio) {
    return res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
  }
  db.insert(newUser)
    .then(user => {
      res.status(201).json({ ...newUser, id: user.id, success: true });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "There was an error while saving the user to the database."
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({
          success: false,
          message: "The user information could not be retrieved."
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ success: false, message: "The user could not be removed." });
    });
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  if (!req.body.name || !req.body.bio)
    return res.status(400).json({
      success: false,
      message: "Please provide name and bio for the user."
    });
  db.update(id, req.body)
    .then(updatedUser => {
      if (updatedUser) {
        res.status(200).json({ success: true, updatedUser });
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "Please provide name and bio for the user."
      });
    });
});

server.listen(5000, () => {
  console.log("\n***** Listening on Port 5000 *****\n");
});
