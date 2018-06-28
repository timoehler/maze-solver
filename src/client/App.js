import React, { Component } from 'react';
import Grid from './grid/grid';
import './app.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = { model: [] };
  }

  solve = () => {
    alert('TODO');
  }

  onModelChanged = (model) => {
    this.setState({ model });
  }

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
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
        <Grid initialModel={model} isEditable={false} />
      </div>
    );
  }
}
