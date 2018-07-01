const getNode = (map, value) => {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === value) {
        return {
          x: col,
          y: row
        };
      }
    }
  }
  return null;
};

const isInBounds = (node, map) => node.x >= 0
  && node.y >= 0
  && node.x < map[0].length
  && node.y < map.length;

const isVisited = (node, pathMap) => pathMap[node.y][node.x].length > 0;

const nodeEquals = (node1, node2) => node1.x === node2.x && node1.y === node2.y;

const isTraversable = (node, symbolMap) => symbolMap[node.y][node.x] !== '#';

const getNeighbors = (symbolMap, location, pathMap, start) => {
  const adjacent = [];
  adjacent.push({ x: location.x - 1, y: location.y });
  adjacent.push({ x: location.x + 1, y: location.y });
  adjacent.push({ x: location.x, y: location.y - 1 });
  adjacent.push({ x: location.x, y: location.y + 1 });

  return adjacent
    .filter(node => isInBounds(node, symbolMap))
    .filter(node => !isVisited(node, pathMap))
    .filter(node => !nodeEquals(node, start))
    .filter(node => isTraversable(node, symbolMap));
};

const updatePathMap = (pathMap, nodes, parent) => {
  const path = pathMap[parent.y][parent.x].slice();
  path.push(parent);
  nodes.forEach((node) => {
    pathMap[node.y][node.x] = path;
  });
};

const updateSymbolMapWithSolution = (symbolMap, solution) => {
  solution.shift();
  solution.forEach((node) => {
    symbolMap[node.y][node.x] = '@';
  });
  return symbolMap;
};

const hydratePathMap = (pathMap, model, start, end) => {
  let neighbors = getNeighbors(model, start, pathMap, start);
  updatePathMap(pathMap, neighbors, start);
  let found = false;
  while (neighbors.length > 0 && !found) {
    const next = [];
    neighbors.forEach((neighbor) => {
      if (neighbor.x === end.x && neighbor.y === end.y) {
        found = true;
      } else {
        const items = getNeighbors(model, neighbor, pathMap, start);
        updatePathMap(pathMap, items, neighbor);
        items.forEach((i) => {
          next.push(i);
        });
      }
    });
    neighbors = next;
  }

  return found;
};

const solve = (symbolMap) => {
  const pathMap = symbolMap.map(x => x.map(() => []));
  const start = getNode(symbolMap, 'A');
  const end = getNode(symbolMap, 'B');
  const found = hydratePathMap(pathMap, symbolMap, start, end);
  const solution = pathMap[end.y][end.x];
  const model = found ? updateSymbolMapWithSolution(symbolMap, solution) : null;
  return {
    model,
    length: solution.length + 1
  };
};

module.exports = {
  solveMap(model) {
    return solve(model);
  }
};
