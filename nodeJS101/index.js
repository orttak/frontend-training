// const http = require('http'); // Importing the http module

// const host = "127.0.0.1";
// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });
// server.listen(port, host, () => {
//     console.log(`Server running at http://${host}:${port}/`);
// });

const express = require('express');
const data = require("./data.js");

const aktorlerRouter = require("./routes/actor");

const logger = require("./middlewares/logger");
const errorHandling = require("./middlewares/errorHandling");

const server = express();
server.use(express.json());
server.use(logger);

server.use("/aktorler", aktorlerRouter);

server.get("/", (req, res) => {
  res.send("Express'ten merhaba");
});


server.use(errorHandling);

server.listen(3000, () => {
  console.log("http://localhost:5000 adresine gelen istekler dinleniyor...");
});