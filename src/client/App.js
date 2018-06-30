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

  resizeModel = (length) => {
    const newModel = [];
    for (let i = 0; i <= length; i++) {
      const newRow = [];
      for (let j = 0; j <= length; j++) {
        newRow.push('.');
      }
      newModel.push(newRow);
    }
    this.setState({ model: newModel });
  }


  usePreset = (preset) => {
    let newModel = [];

    switch (preset) {
      case '1':
        newModel = [
          ['A', '.', '.'],
          ['#', '.', '.'],
          ['#', '.', 'B']
        ];
        break;
      case '2':
        newModel = [
          ['A', '.', '.'],
          ['#', '.', '.'],
          ['#', '.', 'B']
        ];
        break;
      case '3':
        newModel = [
          ['A', '.', '.'],
          ['#', '.', '.'],
          ['#', '.', 'B']
        ];
        break;
      case '4':
        newModel = [
          ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
          ['#', 'A', '.', '.', '.', '#', '.', '.', '.', '#'],
          ['#', '.', '#', '.', '#', '#', '.', '#', '.', '#'],
          ['#', '.', '#', '.', '#', '#', '.', '#', '.', '#'],
          ['#', '.', '#', '.', '.', '.', '.', '#', 'B', '#'],
          ['#', '.', '#', '.', '#', '#', '.', '#', '.', '#'],
          ['#', '.', '.', '.', '.', '#', '.', '.', '.', '#'],
          ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#']
        ];
        break;
      default:
    }

    this.setState({ model: newModel });
  }

  render() {
    const { model, solutionModel, editorState } = this.state;

    return (
      <div>
        <h1>Maze Solver</h1>
        <h2>Tool Palette</h2>
        <Editor selectionChanged={this.onEditorChanged} />
        <h2>Maze type</h2>
        <button type="submit" onClick={() => this.resizeModel('8')}>Small</button>
        <button type="submit" onClick={() => this.resizeModel('16')}>Medium</button>
        <button type="submit" onClick={() => this.resizeModel('32')}>Large</button>
        <button type="submit" onClick={() => this.resizeModel('64')}>Extra-Large</button>
        <button type="submit" onClick={() => this.usePreset('1')}>preset 1</button>
        <button type="submit" onClick={() => this.usePreset('2')}>preset 2</button>
        <button type="submit" onClick={() => this.usePreset('3')}>preset 3</button>
        <button type="submit" onClick={() => this.usePreset('4')}>preset 4</button>

        <h2>Create your maze:</h2>
        <Grid editorType={editorState} model={model} modelChanged={this.onModelChanged} />
        <button type="submit" onClick={() => this.solve()}>Solve!</button>
        <h2>Solution:</h2>
        <Grid model={solutionModel} isEditable={false} />
      </div>
    );
  }
}
