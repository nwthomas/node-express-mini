// implement your API here

const express = require("express");
const db = require("./data/db");
const server = express();
server.use(express.json());

server.get("/api/users", (req, res) => {
  db.hubs
    .find()
    .then(hubs => {
      res.status(200).json({ success: true, hubs });
    })
    .catch(err => {
      res.status(err.code).json({ success: false, message: err.message });
    });
});

server.post("/api/users", (req, res) => {
  const hub = req.body;
  db.hubs
    .insert(hub)
    .then(hub => {
      res.status(201).json({ success: true, hub });
    })
    .catch(({ code, message }) => {
      res.status(code).json({ success: false, message });
    });
});

server.listen(5000, () => {
  console.log("\n***** Listening on Port 5000 *****\n");
});
