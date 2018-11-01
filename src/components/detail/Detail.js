import React, { Component } from 'react';
import { API_URL } from '../../config';
import { handleResponse, renderChangePercent } from '../../helpers';
import Loading from '../common/Loading';
import './Detail.css';

class Detail extends Component {
	state = {
		loading: false,
		error: null,
		currency: {}
	}

	componentDidMount() {
		this.fetchCurrency();
	}

	componentDidUpdate(prevProps){
		if (this.props.match.params.id !== prevProps.match.params.id){
			this.fetchCurrency();
		}
	}

	fetchCurrency = () => {
		this.setState(ps => ({
			...ps,
			loading: true
		}));

		fetch(`${API_URL}/cryptocurrencies/${this.props.match.params.id}`)
		.then(handleResponse)
		.then(data => {
			this.setState(ps => ({
				...ps,
				loading: false,
				error: null,
				currency: data
			}));
		})
		.catch(error => {
			this.setState(ps => ({
				...ps,
				loading: false,
				error: error.errorMessage
			}));
		});
	}

	render() {
		const { loading, error, currency } = this.state;

		if(loading) {
			return <div className="loading-container"><Loading /></div>
		}

		if(error) {
			return <div className="error">{error}</div>
		}

		return (
			<div className="Detail">
				<h1 className="Detail-heading">
					{currency.name} ({currency.symbol})
				</h1>
				<div className="Detail-container">
					<div className="Detail-item">
						Price <span className="Detail-value">$ {currency.price}</span>
					</div>
					<div className="Detail-item">
						Rank <span className="Detail-value">{currency.rank}</span>
					</div>
					<div className="Detail-item">
						24H Change <span className="Detail-value">{renderChangePercent(currency.percentChange24h)}</span>
					</div>
					<div className="Detail-item">
						<span className="Detail-title">24H Volume</span>
						<span className="Detail-dollar">$</span>
						{currency.volume24h}
					</div>
					<div className="Detail-item">
						<span className="Detail-title">Total supply</span>
						{currency.totalSupply}
					</div>
				</div>
			</div>
		)
	}
}

export default Detail;