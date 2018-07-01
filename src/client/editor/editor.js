import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './editor.less';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      type: '#',
    };
  }

  changeType = (type) => {
    const { selectionChanged } = this.props;
    this.setState({ type });
    selectionChanged(type);
  }

  render() {
    const { type } = this.state;
    return (
      <div className="tool-palette">
        <Button variant={`${type === '#' ? 'contained' : 'outlined'}`} color="primary" className="tool" onClick={() => this.changeType('#')}>block</Button>
        <Button variant={`${type === '.' ? 'contained' : 'outlined'}`} color="primary" className="tool" onClick={() => this.changeType('.')}>road</Button>
        <Button variant={`${type === 'A' ? 'contained' : 'outlined'}`} color="primary" className="tool" onClick={() => this.changeType('A')}>start</Button>
        <Button variant={`${type === 'B' ? 'contained' : 'outlined'}`} color="primary" className="tool" onClick={() => this.changeType('B')}>destination</Button>
      </div>
    );
  }
}

Editor.propTypes = {
  selectionChanged: PropTypes.func.isRequired,
};

export default Editor;
