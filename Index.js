// index.js

import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

let tasks = [];

app.get('/', (req, res) => {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = today.toLocaleDateString('en-US', options);

  res.render('index', { currentDate: dateString, tasks: tasks }); // Pass tasks as an object to the view
});

app.post('/addTask', (req, res) => {
  const newTask = { text: req.body.task, completed: false };
  tasks.push(newTask);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
