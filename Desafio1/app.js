const express = require('express');
const app = express();

app.use(express.json());
app.listen(3000);

let projects = [];
let called = 0;

app.use((req, res, next) => {
  called++;
  console.log(`Called ${called} times`);

  return next();
});

function findProject(req, res, next) {
  const { id } = req.params;
  let found = false;

  projects.forEach(el => {
    if (el.id === id) {
      found = true;
    }
  });

  if (found) {
    return next()
  } else {
    return res.status(400).json({ error: "Project with this ID doesn't exist" });
  }
}

app.post('/projects', (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  const project = { 
    "id": id, 
    "title": title,
    "tasks": []
  }

  projects.push(project);

  return res.json(projects)
});

app.get('/projects', (req, res) => {
  return res.json(projects);
});

app.put('/projects/:id', findProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach(el => {
    if (el.id === id) {
      el.title = title;
      return res.json(projects);
    }
  });
});

app.delete('/projects/:id', findProject, (req, res) => {
  const { id } = req.params;

  projects.forEach(el => {
    if (el.id === id) {
      projects.splice(projects.indexOf(el), 1);
      return res.json(projects);
    }
  })
});


app.post('/projects/:id/tasks', findProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach(el => {
    if (el.id === id) {
      el.tasks.push(title);
      return res.json(projects);
    }
  });
});