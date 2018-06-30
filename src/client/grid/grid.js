import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from '../cell/cell';
import './grid.less';

class Grid extends Component {
  onCellTypeChanged = (rowIndex, colIndex, type) => {
    const { model } = this.props;
    const { modelChanged } = this.props;

    if (type === 'A' || type === 'B') {
      for (let i = 0; i < model.length; i++) {
        for (let j = 0; j <= model[i].length; j++) {
          if (model[i][j] === type) {
            model[i][j] = '.';
          }
        }
      }
    }

    model[rowIndex][colIndex] = type;
    if (modelChanged) {
      modelChanged(model);
    }
  }

  rowBuilder = (row, rowIndex) => {
    const cells = row.map(this.cellBuilder.bind(this, rowIndex));
    return (
      <div className="grid-row" key={`grid-row-${rowIndex}`}>
        { cells }
      </div>
    );
  }

  cellBuilder = (rowIndex, cellType, colIndex) => {
    const { editorType } = this.props;
    return (
      <div className="grid-cell" key={`grid-cell-${rowIndex}-${colIndex}`}>
        <Cell
          type={cellType}
          editorType={editorType}
          typeChanged={this.onCellTypeChanged}
          rowIndex={rowIndex}
          colIndex={colIndex}
        />
      </div>
    );
  }

  render() {
    const { model } = this.props;
    const rows = model.map(this.rowBuilder);
    return (
      <div className="grid-container">
        {rows}
      </div>
    );
  }
}

Grid.propTypes = {
  model: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  modelChanged: PropTypes.func,
  editorType: PropTypes.string,
};

Grid.defaultProps = {
  modelChanged: null,
  editorType: '.'
};

export default Grid;
