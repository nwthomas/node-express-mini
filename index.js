// implement your API here

const express = require("express");
const db = require("./data/db");
const server = express();
server.use(express.json());

server.listen(5000, () => {
  console.log("\n***** Listening on Port 5000 *****\n");
});
