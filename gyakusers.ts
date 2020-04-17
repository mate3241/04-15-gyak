//const express = require('express');
import express, { Request, Response } from 'express';
const app = express();
interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string  
}
const users:User[] = [];
let index: number = 0;

users.push({ id: index++, name: 'maci22', email: 'ize@bize.com', role: 'user', password: '12345' });
users.push({ id: index++, name: 'laci44', email: 'hax@bvalami.com', role: 'admin', password: 'abcd' });
users.push({ id: index++, name: 'whatevs536', email: 'dude@gmail.com', role: 'user', password: 'papa' });
users.push({ id: index++, name: 'bigdave', email: 'some@thing.com', role: 'user', password: 'qwert' });
users.push({ id: index++, name: 'pistu78', email: 'pistu78@freemail.hu', role: 'admin', password: 'sopvjs9v9' });

const usersIdGetHandler = (req: Request, res: Response) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === parseInt(req.params.id)) {
      return res.json(users[i]);
    }
    return res.json({});
  }
};
const usersPostHandler = (req: Request, res: Response) => {
  const user: User = ({ id: index++, name: req.body.name, email: req.body.email, role: 'user', password: req.body.password });
  users.push(user);
  //delete user.password;
  res.status(201).json(user);
};
const usersIdPutHandler = (req: Request, res: Response) => { // if, ha nem ad meg új nevet, undefined lesz a régi helyén KERESÉS
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === parseInt(req.params.id)) {
      users[i] = ({ id: parseInt(req.params.id), name: req.body.name, email: req.body.email, role: req.body.role, password: req.body.password });
      //user[i].name = req.body.name ? req.body.user : user.name;
      ///user[i].email = req.body.email;
      return res.sendStatus(200);
    }
  }
};

const usersIdDeleteHandler = (req: Request, res: Response) => {
  for (let index = 0; index < users.length; index++) {
    if (users[index].id === parseInt(req.params.id)) {
      users.splice(index, 1);
      return res.sendStatus(204);
    }
  }
  res.sendStatus(200);
};
app.use(express.json());
app.get('/users/:id', usersIdGetHandler);
app.post('/users', usersPostHandler);
app.put('/users/:id', usersIdPutHandler);
app.delete('/users/:id', usersIdDeleteHandler);
app.listen(3000);
