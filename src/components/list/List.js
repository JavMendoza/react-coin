import React, { Component } from 'react';
import Loading from '../common/Loading';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Table from './Table';
import Pagination from './Pagination';
import './Table.css';

class List extends Component {
	state = {
		currencies: [],
		loading: false,
		error: null,
		totalPages: 0,
		currentPage: 1
	}

	componentDidMount() {
		this.fetchCurrencies();
	}

	fetchCurrencies = () => {
		this.setState((prevState) => ({
			...prevState,
			loading: true
		}));

		const { currentPage } = this.state;
		
		fetch(`${API_URL}/cryptocurrencies?page=${currentPage}&perPage=20`)
		.then(handleResponse)
		.then(data => {
			this.setState((prevState) => ({
				error: null,
				loading: false,
				currencies: data.currencies,
				totalPages: data.totalPages,
				currentPage: data.page
			}))
		})
		.catch(error => {
			this.setState((prevState) => ({
				...prevState,
				loading: false,
				error: error.errorMessage
			}));
		})
	}

	setPage = (numPage) => {
		this.setState((prevState) => ({
			...prevState,
			currentPage: numPage
		}), () => {
			this.fetchCurrencies();
		});
	}

	render() {
		const { loading, error, currencies, totalPages, currentPage } = this.state;

		if (loading) {
			return <div className="loading-container"><Loading /></div>
		}

		if (error) {
			return <div className="error">{error}</div>
		}

		return (
			<div>
				<Table currencies={currencies} />
				<Pagination currentPage={currentPage} totalPages={totalPages} handleSetPage={this.setPage} />
			</div>
		)
	}
}

export default List;