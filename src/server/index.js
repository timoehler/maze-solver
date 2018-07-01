const express = require('express');

const app = express();
const mazeSolver = require('./maze-solver');

const getSolution = (req) => {
  const { model } = req.body;
  return mazeSolver.solveMap(model);
};

app.use(express.json());
app.post('/api/getMazeSolution', (req, res) => {
  const solution = getSolution(req);
  res.send({ model: solution.model, length: solution.length });
});
app.listen(8080, () => console.log('Listening on port 8080!'));
