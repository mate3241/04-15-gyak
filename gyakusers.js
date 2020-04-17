const express = require('express');
const app = express();

const users = [];
let index = 0;

users.push({ id: index++, name: 'maci22', email: 'ize@bize.com', role: 'user', password: '12345' });
users.push({ id: index++, name: 'laci44', email: 'hax@bvalami.com', role: 'admin', password: 'abcd' });
users.push({ id: index++, name: 'whatevs536', email: 'dude@gmail.com', role: 'user', password: 'papa' });
users.push({ id: index++, name: 'bigdave', email: 'some@thing.com', role: 'user', password: 'qwert' });
users.push({ id: index++, name: 'pistu78', email: 'pistu78@freemail.hu', role: 'admin', password: 'sopvjs9v9' });

const usersIdGetHandler = (req, res) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === parseInt(req.params.id)) {
      return res.json(users[i]);
    }
    return res.json({});
  }
};
const usersPostHandler = (req, res) => {
  const user = ({ id: index++, name: req.body.name, email: req.body.email, role: req.body.role, password: req.body.password });
  users.push(user);
  res.status(201).json(user);
};
const usersIdPutHandler = (req, res) => { // if, ha nem ad meg új nevet, undefined lesz a régi helyén KERESÉS
  console.log('itt még jó');
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === parseInt(req.params.id)) {
      users[i] = ({ id: parseInt(req.params.id), name: req.body.name, email: req.body.email, role: req.body.role, password: req.body.password });
      return res.sendStatus(200);
    }
  }
};

const usersIdDeleteHandler = (req, res) => {
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    if (user.id === parseInt(req.params.id)) {
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
