import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './editor.less';

class Editor extends Component {
  constructor(props) {
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
        <button className="road" onClick={() => this.changeType('.')}>road</button>
        <button className="block" onClick={() => this.changeType('#')}>block</button>
        <button className="start" onClick={() => this.changeType('A')}>start</button>
        <button className="end" onClick={() => this.changeType('B')}>end</button>

      </div>
    );
  }
}

Editor.propTypes = {
  selectionChanged: PropTypes.func.isRequired,
};

export default Editor;
