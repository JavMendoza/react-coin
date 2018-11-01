import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Loading from './Loading';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';
import './Search.css';

class Search extends Component {
	state = {
		searchQuery: '',
		searchResults: [],
		error: null,
		loading: false 
	}

	handleOnChange = (e) => {
		const value = e.target.value;
		this.setState(ps => ({
			...ps,
			searchQuery: value
		}));

		if(!value) {
			return '';
		}

		this.setState(ps => ({
			...ps,
			loading: true
		}));

		fetch(`${API_URL}/autocomplete?searchQuery=${value}`)
		.then(handleResponse)
		.then(data => {
			this.setState(ps => ({
				...ps,
				searchResults: data,
				loading: false
			}));
		})
		.catch(error => {
			this.setState(ps => ({
				...ps,
				error: error.errorMessage,
				loading: false
			}))
		});
	}

	goToDetailHandler = (result) => {
		const { history } = this.props;
		this.setState(ps => ({
			...ps,
			searchQuery: '',
			searchResults: []
		}));
		history.push(`/currency/${result.id}`);
	}

	renderSearchResults = () => {
		const { searchResults, searchQuery, loading } = this.state;

		if (!searchQuery) {
			return '';
		}

		return (
			<div className="Search-result-container">
				{searchResults.length === 0 && !loading && <div className="Search-no-result">No results found.</div>}

				{searchResults.length > 0 &&
					searchResults.map(result => (
						<div 
							className="Search-result" 
							key={result.id}
							onClick={() => this.goToDetailHandler(result)}>
							{result.name} ({result.symbol})
						</div>
					))
				}
			</div>
		)
	}

	render(){
		const { loading } = this.state;

		return(
			<div className="Search">
				<span className="Search-icon"></span>
				<input 
					className="Search-input"
					value={this.state.searchQuery}
					onChange={this.handleOnChange}
					placeholder="Currency Name"
					type="text"/>
				{loading && 
					<div className="Search-loading">
						<Loading width="15px" height="15px" />
					</div>
				}
				{this.renderSearchResults()}
			</div>
		)
	}
}

export default withRouter(Search);