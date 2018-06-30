import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './editor.less';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      type: '.',
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
      <div>
        Tool Palette
        <button type="button" className={`road ${type === '.' ? 'selected' : ''}`} onClick={() => this.changeType('.')}>road</button>
        <button type="button" className={`block ${type === '#' ? 'selected' : ''}`} onClick={() => this.changeType('#')}>block</button>
        <button type="button" className={`start ${type === 'A' ? 'selected' : ''}`} onClick={() => this.changeType('A')}>start</button>
        <button type="button" className={`end ${type === 'B' ? 'selected' : ''}`} onClick={() => this.changeType('B')}>end</button>
      </div>
    );
  }
}

Editor.propTypes = {
  selectionChanged: PropTypes.func.isRequired,
};

export default Editor;
