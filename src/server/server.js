import express from 'express';

var app = express();

app.use(express.static('src/web'));

app.listen(4000);

console.log("http://localhost:4000");