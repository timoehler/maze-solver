import React, { Component } from 'react';
import Grid from './grid/grid';
import Editor from './editor/editor';
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

    // const model = [
    //   ['A', '.', '.'],
    //   ['#', '.', '.'],
    //   ['#', '.', 'B']
    // ];

    this.state = {
      editorState: '.',
      model,
      solutionModel: []
    };
  }

  onModelChanged = (model) => {
    this.setState({ model });
  }

  onEditorChanged = (type) => {
    this.setState({ editorState: type });
  }

  solve = () => {
    const { model } = this.state;

    fetch('/api/getMazeSolution', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model })
    })
      .then(res => res.json())
      .then(solution => this.setState({ solutionModel: solution.model }));
  }

  render() {
    const { model, solutionModel, editorState } = this.state;

    return (
      <div>
        <h1>Maze Solver</h1>
        <h2>Tool Palette</h2>
        <Editor selectionChanged={this.onEditorChanged} />
        <h2>Create your maze:</h2>
        <Grid editorType={editorState} model={model} modelChanged={this.onModelChanged} />
        <button type="submit" onClick={() => this.solve()}>Solve!</button>
        <h2>Solution:</h2>
        <Grid model={solutionModel} isEditable={false} />
      </div>
    );
  }
}
