const express = require('express');

const app = express();
const mazeSolver = require('./maze-solver');

app.use(express.json());
app.post('/api/getMazeSolution', (req, res) => res.send({ model: getSolution(req) }));
app.listen(8080, () => console.log('Listening on port 8080!'));

const getSolution = (req) => {
  const model = req.body.model;
  return mazeSolver.solveMap(model);
};
