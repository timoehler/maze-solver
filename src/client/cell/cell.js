import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './cell.less';

class Cell extends Component {
	constructor (props) {
		super();
		
		const { initialSymbol } = props;

		this.state = {
			symbol: initialSymbol,
		};
	}

	render () {
		const { symbol } = this.state;
		const type = this.convertSymbolToType(symbol);

		return (
			<div className={`maze-cell ${type}`} />
		);
	}
	
	convertSymbolToType = (symbol) => {
		switch (symbol) {
			case '.':
				return 'road';
			case '#':
				return 'block';
			default:
				return 'unknown';
		}
	}
}

Cell.propTypes = {
	initialSymbol: PropTypes.string,
	isEditable: PropTypes.bool
};

Cell.defaultProps = {
	initialSymbol: '#',
	isEditable: true
};

export default Cell;
