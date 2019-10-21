const express = require('express');
const app = express();

app.use(express.json());
app.listen(3000);

const projects = [];
let numberOfRequests = 0;

app.use((req, res, next) => {
  numberOfRequests++;
  console.log(`Number of requests: ${numberOfRequests}`);

  return next();
});

function findProject(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project with this ID doesn't exist" });
  }

  return next()
}

app.get('/projects', (req, res) => {
  return res.json(projects);
});

app.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project);

  return res.json(projects)
});

app.put('/projects/:id', findProject, (req, res) => {
  const { id, } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

app.delete('/projects/:id', findProject, (req, res) => {
  const { id } = req.params;

  const pIndex = projects.findIndex(p => p.id == id);

  projects.splice(pIndex, 1);
  
  return res.send();
});


app.post('/projects/:id/tasks', findProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);
  
  return res.json(project);
});