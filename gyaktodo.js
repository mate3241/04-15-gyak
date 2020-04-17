const express = require('express');
const app = express();

/*const logger = (req, res, next) => {
  console.log(req.params);
  next();
};

const rootHandler = (req, res) => {
  console.log(req.params);
  res.json({ status: 'ok', id: req.params.id });
};

const secondHandler = (req, res) => {
  console.log(req.params);
  res.json({ status: 'cica' });
};

app.use(express.json());
app.use(logger);
app.get('/', rootHandler);
app.get('/cica', secondHandler);
app.get('/:id', rootHandler);
app.listen(3000);*/

const todos = [];
let todoIndex = 0;

todos.push({ id: todoIndex++, name: 'valami', description: 'valami', status: 'done', author: 'anonymus' });
todos.push({ id: todoIndex++, name: 'valami', description: 'valami', status: 'done', author: 'anonymus' });
todos.push({ id: todoIndex++, name: 'valami', description: 'valami', status: 'done', author: 'anonymus' });

const getTodosHandler = (req, res) => {
  res.json(todos);
};

const postTodosHandler = (req, res) => {
  console.log(req.body);
  const todo = ({ id: todoIndex++, name: req.body.name, description: req.body.description, status: req.body.status, author: req.body.author });
  todos.push(todo);
  res.status(201).json(todo);
};

const getTodosIdHandler = (req, res) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === parseInt(req.params.id)) {
      return res.json(todos[i]);
    }
  }
  res.json({});
};

const putTodosIdHandler = async (req, res) => { // if, ha nem ad meg új nevet, undefined lesz a régi helyén KERESÉS FOR  OF
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === parseInt(req.params.id)) {
      todos[i] = ({ id: parseInt(req.params.id), name: req.body.name, description: req.body.description, status: req.body.status, author: req.body.author });
      return res.sendStatus(203);
    }
  }
  res.sendStatus(200);
};

const deleteTodosIdHandler = (req, res) => {
  for (let index = 0; index < todos.length; index++) {
    const todo = todos[index];
    if (todo.id === parseInt(req.params.id)) {
      todos.splice(index, 1);
      return res.sendStatus(204);
    }
  }
  res.sendStatus(200);
};

app.use(express.json());
app.get('/todos', getTodosHandler);
app.post('/todos', postTodosHandler);
app.get('/todos/:id', getTodosIdHandler);
app.put('/todos/:id', putTodosIdHandler);
app.delete('/todos/:id', deleteTodosIdHandler);
app.listen(3000);
