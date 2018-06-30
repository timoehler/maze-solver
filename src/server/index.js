const express = require('express');

const app = express();
const mazeSolver = require('./maze-solver');

const getSolution = (req) => {
  const { model } = req.body;
  return mazeSolver.solveMap(model);
};

app.use(express.json());
app.post('/api/getMazeSolution', (req, res) => res.send({ model: getSolution(req) }));
app.listen(8080, () => console.log('Listening on port 8080!'));
