import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './cell.less';

class Cell extends Component {
  constructor(props) {
    super();
    const { initialType } = props;
    this.state = {
      type: initialType,
    };
  }

  makeTypeCssFriendly = (symbol) => {
    switch (symbol) {
      case '.':
        return 'road';
      case '#':
        return 'block';
      case 'A':
        return 'start';
      case 'B':
        return 'end';
      case '@':
        return 'solution';
      default:
        return 'unknown';
    }
  }

  changeType = () => {
    const { isEditable, typeChanged, editorType } = this.props;
    if (isEditable) {
      this.setState({ type: editorType });
      typeChanged(editorType);
    }
  }

  render() {
    const { type } = this.state;
    const typeClassName = this.makeTypeCssFriendly(type);
    return (
      <div role="button" tabIndex={0} className={`maze-cell ${typeClassName}`} onKeyDown={() => this.changeType()} onClick={() => this.changeType()} />
    );
  }
}

Cell.propTypes = {
  initialType: PropTypes.string,
  editorType: PropTypes.string,
  isEditable: PropTypes.bool,
  typeChanged: PropTypes.func.isRequired,
};

Cell.defaultProps = {
  initialType: '#',
  editorType: '.',
  isEditable: true
};

export default Cell;
