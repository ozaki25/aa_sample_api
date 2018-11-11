const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8888;
let persons = [
  {
    id: Date.now().toString(),
    name: 'ozaki',
    age: '28',
    gender: '男性',
  },
];

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.get('/persons', (req, res) => {
  console.log('GET: /persons');
  res.send(persons);
});

app.post('/persons', (req, res) => {
  console.log('POST: /persons', req.body);
  const person = { ...req.body, id: Date.now().toString() };
  persons = [...persons, person];
  return res.send(person);
});

app.get('/persons/:id', (req, res) => {
  console.log('GET: /persons/:id');
  const { id } = req.params;
  const person = persons.find(p => p.id === id);
  res.send(person);
});

app.put('/persons/:id', (req, res) => {
  console.log('PUT: /persons/:id', req.body);
  const { id } = req.params;
  const person = req.body;
  persons = persons.find(p => p.id === id)
    ? persons.map(p => (p.id === id ? person : p))
    : [...persons, person];
  return res.send(person);
});

app.patch('/persons/:id', (req, res) => {
  console.log('PATCH: /persons/:id', req.body);
  const { id } = req.params;
  const person = req.body;
  persons = persons.map(p => (p.id === id ? { ...p, ...person } : p));
  return res.send(person);
});

app.delete('/persons/:id', (req, res) => {
  console.log('DELETE: /persons/:id', req.body);
  const { id } = req.params;
  persons = persons.filter(p => p.id !== id);
  res.send();
});

app.listen(port, () => {
  console.log(`app start listening on port ${port}`);
});
