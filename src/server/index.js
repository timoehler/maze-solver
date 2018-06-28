const express = require('express');
const app = express();

const model = [
  ['a', '#', '.'],
  ['#', '#', '#'],
  ['.', '#', 'a']
];

app.use(express.static('dist'));
app.get('/api/getMazeSolution', (req, res) => res.send({ model: model }));
app.listen(8080, () => console.log('Listening on port 8080!'));
