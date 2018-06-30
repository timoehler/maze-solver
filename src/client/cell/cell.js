import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './cell.less';

class Cell extends Component {
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
    const {
      isEditable,
      typeChanged,
      editorType,
      rowIndex,
      colIndex
    } = this.props;

    if (isEditable) {
      typeChanged(rowIndex, colIndex, editorType);
    }
  }

  render() {
    const { type } = this.props;
    const typeClassName = this.makeTypeCssFriendly(type);
    return (
      <div role="button" tabIndex={0} className={`maze-cell ${typeClassName}`} onKeyDown={() => this.changeType()} onClick={() => this.changeType()} />
    );
  }
}

Cell.propTypes = {
  type: PropTypes.string,
  editorType: PropTypes.string,
  isEditable: PropTypes.bool,
  typeChanged: PropTypes.func.isRequired,
  rowIndex: PropTypes.number.isRequired,
  colIndex: PropTypes.number.isRequired,
};

Cell.defaultProps = {
  type: '#',
  editorType: '.',
  isEditable: true
};

export default Cell;
