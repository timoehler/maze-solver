import React, { Component } from 'react';
import Grid from './grid/grid';
import './app.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      model: [],
      solutionModel: [] 
    };
  }

  onModelChanged = (model) => {
    this.setState({ model });
  }

  solve = () => {
    fetch('/api/getMazeSolution')
      .then(res => res.json())
      .then(solution => this.setState({ solutionModel: solution.model }));
  }

  render() {
    const { solutionModel } = this.state;
    const model = [
      ['a', '.', '.'],
      ['.', '#', '.'],
      ['.', '.', '.']
    ];
    return (
      <div>
        <h1>Maze Solver</h1>
        <h2>Create your maze:</h2>
        <Grid initialModel={model} modelChanged={this.onModelChanged} />
        <button type="submit" onClick={() => this.solve()}>Solve!</button>
        <h2>Solution:</h2>
        <Grid initialModel={solutionModel} isEditable={false} />
      </div>
    );
  }
}
