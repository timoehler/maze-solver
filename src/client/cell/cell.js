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
      default:
        return 'unknown';
    }
  }

  render() {
    const { type } = this.state;
    const { isEditable, typeChanged } = this.props;
    const typeClassName = this.makeTypeCssFriendly(type);
    return (
      <div className={`maze-cell ${typeClassName}`} onClick={() => isEditable && typeChanged(type)} />
    );
  }
}

Cell.propTypes = {
  initialType: PropTypes.string,
  isEditable: PropTypes.bool,
  typeChanged: PropTypes.func.isRequired,
};

Cell.defaultProps = {
  initialType: '#',
  isEditable: true
};

export default Cell;
