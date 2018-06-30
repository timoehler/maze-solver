import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from '../cell/cell';
import './grid.less';

class Grid extends Component {
  constructor(props) {
    super();
    const { initialModel } = props;
    this.state = {
      model: initialModel,
    };
  }

  componentDidUpdate(prevProps) {
    const { initialModel } = this.props;
    if (prevProps.initialModel !== initialModel) {
      this.setState({ model: initialModel });
    }
  }

  onCellTypeChanged = (rowIndex, colIndex, type) => {
    const { model } = this.state;
    const { modelChanged } = this.props;
    model[rowIndex][colIndex] = type;
    this.setState({ model });
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
    const changeCellType = this.onCellTypeChanged.bind(this, rowIndex, colIndex);
    return (
      <div className="grid-cell" key={`grid-cell-${rowIndex}-${colIndex}`}>
        <Cell
          initialType={cellType}
          editorType={editorType}
          typeChanged={changeCellType}
        />
      </div>
    );
  }

  render() {
    const { model } = this.state;
    const rows = model.map(this.rowBuilder);
    return (
      <div className="grid-container">
        {rows}
      </div>
    );
  }
}

Grid.propTypes = {
  initialModel: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  modelChanged: PropTypes.func,
  editorType: PropTypes.string,
};

Grid.defaultProps = {
  modelChanged: null,
  editorType: '.'
};

export default Grid;
