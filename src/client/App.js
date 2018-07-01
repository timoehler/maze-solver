import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from './grid/grid';
import Editor from './editor/editor';
import { maze1 } from './presets/maze1';
import { maze2 } from './presets/maze2';
import { maze3 } from './presets/maze3';

import './app.less';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      editorState: '#',
      model: [],
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
      .then(solution => this.setState({ solutionModel: solution.model }))
      .catch(() => alert('This maze is unsolvable!'));
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
        newModel = maze1;
        break;
      case '2':
        newModel = maze2;
        break;
      case '3':
        newModel = maze3;
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
        <p>Create a new map, or choose a preset.</p>
        <div className="map-controls">
          <div className="map-size-container">
            <Button className="button" variant="outlined" color="primary" onClick={() => this.resizeModel('6')}>Small</Button>
            <Button className="button" variant="outlined" color="primary" onClick={() => this.resizeModel('12')}>Medium</Button>
            <Button className="button" variant="outlined" color="primary" onClick={() => this.resizeModel('18')}>Large</Button>
          </div>
          <div className="map-preset-container">
            <Button className="button" variant="outlined" onClick={() => this.usePreset('1')}>preset 1</Button>
            <Button className="button" variant="outlined" onClick={() => this.usePreset('2')}>preset 2</Button>
            <Button className="button" variant="outlined" onClick={() => this.usePreset('3')}>preset 3</Button>
          </div>
        </div>
        <div className={`maze-container ${model.length === 0 && 'hidden'}`}>
          <p className="select-message">Select a maze tool to draw your custom maze.</p>
          <Editor selectionChanged={this.onEditorChanged} />
          <Grid editorType={editorState} model={model} modelChanged={this.onModelChanged} />
          <Button className="solve-button" variant="contained" color="secondary" onClick={() => this.solve()}>Solve!</Button>
          <div className={`solution-container ${solutionModel.length === 0 && 'hidden'}`}>
            <h2>Solution:</h2>
            <Grid model={solutionModel} isEditable={false} />
          </div>
        </div>
      </div>
    );
  }
}
