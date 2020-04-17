import express, { Request, Response } from 'express'; //typescript import
//const express = require('express'); //javascript import

/*enum Status {
  New,
  In-progress,
  Done,
}*/
//npm install @types/express
interface Todo {
  id: number;
  name: string;
  description: string;
  status: 'new' | 'in-progress' | 'done';
  authorID: number
}

const app = express();
const port = process.env.API_PORT || 3000;
const todos: Todo[] = [];
//const todos: Array<Todo> = [];
let todoIndex = 0;

todos.push({ id: todoIndex++, name: 'valami', description: 'valami', status: 'new', authorID: 23 });
todos.push({ id: todoIndex++, name: 'valami2', description: 'valami2', status: 'done', authorID: 10 });
todos.push({ id: todoIndex++, name: 'valami3', description: 'valami3', status: 'in-progress', authorID: 5 });

const getTodosHandler = (req: Request, res: Response) => {
  return res.json(todos);
};

const postTodosHandler = (req: Request, res: Response) => {
  console.log(req.body);
  const todo: Todo = ({ id: todoIndex++, name: req.body.name, description: req.body.description, status: req.body.status, authorID: req.body.authorID });
  todos.push(todo);
  return res.status(201).json(todo);
};

const getTodosIdHandler = (req: Request, res: Response) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === parseInt(req.params.id)) {
      return res.json(todos[i]);
    }
  }
  return res.json({});
};

const putTodosIdHandler = async (req: Request, res: Response) => { // if, ha nem ad meg új nevet, undefined lesz a régi helyén KERESÉS FOR  OF
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === parseInt(req.params.id)) {
      todos[i] = ({ id: parseInt(req.params.id), name: req.body.name, description: req.body.description, status: req.body.status, authorID: req.body.authorID });
      return res.sendStatus(203);
    }
  }
  return res.sendStatus(200);
};

const deleteTodosIdHandler = (req: Request, res: Response) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === parseInt(req.params.id)) {
      todos.splice(i, 1);
      return res.sendStatus(204);
    }
  }
  return res.sendStatus(200);
};

app.use(express.json());
app.get('/todos', getTodosHandler);
app.post('/todos', postTodosHandler);
app.get('/todos/:id', getTodosIdHandler);
app.put('/todos/:id', putTodosIdHandler);
app.delete('/todos/:id', deleteTodosIdHandler);
app.listen(port, () => { console.log(`I'm listening on ${port}`)});
