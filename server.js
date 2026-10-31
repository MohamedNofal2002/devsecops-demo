const express = require('express');
const { exec } = require('child_process');
const app = express();

const secret_token = "Zx9Qm2Lp8Vt4Rk7Wn3Hj6FdYc";

app.get('/', (req, res) => res.send('<h1>DevSecOps demo app</h1>'));

app.get('/ping', (req, res) => {
  exec('ping -c 1 ' + req.query.host, (err, out) => res.send(out));
});

app.get('/hello', (req, res) => res.send('<h1>Hello ' + req.query.name + '</h1>'));

app.get('/calc', (req, res) => res.send(String(eval(req.query.expr))));

app.listen(3000, () => console.log('listening on 3000'));
