import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { renderChangePercent } from '../../helpers';

const Table = (props) => {
	const { currencies, history } = props;

	var currenciesElem = currencies.map(item => {
		return (
			<tr key={item.id} onClick={() => history.push(`/currency/${item.id}`)}>
				<td><span className="Table-rank">{item.rank}</span> {item.name}</td>
				<td><span className="Table-dollar">$</span> {item.price}</td>
				<td><span className="Table-dollar">$</span> {item.marketCap}</td>
				<td>{renderChangePercent(item.percentChange24h)}</td>
			</tr>
		)
	});

	return (
		<div className="Table-container">
			<table className="Table">
				<thead className="Table-head">
					<tr>
						<th>Cryptocurrency</th>
						<th>Price</th>
						<th>Market Cap</th>
						<th>24H Change</th>
					</tr>
				</thead>
				<tbody className="Table-body">
				{currenciesElem}
				</tbody>
			</table>
		</div>
	)
}

Table.propTypes = {
	currencies: PropTypes.array.isRequired,
	history: PropTypes.object.isRequired
}

export default withRouter(Table);