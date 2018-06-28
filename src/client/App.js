import React, { Component } from 'react';
import Grid from './grid/grid';
import './app.css';

export default class App extends Component {
  constructor() {
    super();
    const model = [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', 'A', '.', '.', '.', '#', '.', '.', '.', '#'],
      ['#', '.', '#', '.', '#', '#', '.', '#', '.', '#'],
      ['#', '.', '#', '.', '#', '#', '.', '#', '.', '#'],
      ['#', '.', '#', '.', '.', '.', '.', '#', 'B', '#'],
      ['#', '.', '#', '.', '#', '#', '.', '#', '.', '#'],
      ['#', '.', '.', '.', '.', '#', '.', '.', '.', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#']
    ];

    this.state = {
      model,
      solutionModel: [] 
    };
  }

  onModelChanged = (model) => {
    this.setState({ model });
  }

  solve = () => {
    const { model } = this.state;

    fetch("/api/getMazeSolution", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model })
    })
    .then(res => res.json())
    .then(solution => this.setState({ solutionModel: solution.model }));
  }

  render() {
    const { model, solutionModel } = this.state;

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
