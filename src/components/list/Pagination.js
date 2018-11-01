import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

class Pagination extends Component {
	/*createButtons = (currentPage, totalPages) => {
		let totalPagesList = [],
			showingPages = 1;
		
		if (totalPages > 0) {
			if (totalPages >= 5){
				showingPages = 5;
			} else {
				showingPages = totalPages;
			}
			for (var i=0; i < showingPages; i++) {
				totalPagesList.push(<button className="Pagination-button" key={i+1}>{i+1}</button>);
			}
			
			if (showingPages != totalPages) {
				totalPagesList.push(<button className="Pagination-button" key="extend">...</button>);
				totalPagesList.push(<button className="Pagination-button" key={totalPages}>{totalPages}</button>);
			}
		}

		return totalPagesList;
	}*/

	setPage = (direction) => {
		if(direction === "prev"){
			this.props.handleSetPage(this.props.currentPage-1);
		} else {
			this.props.handleSetPage(this.props.currentPage+1);
		}
	}

	render(){
		const { currentPage, totalPages } = this.props;
		return (
			<div className="Pagination">
				<button className="Pagination-button" onClick={() => this.setPage("prev")} disabled={currentPage <= 1}>
					&larr;
				</button>

				<span className="Pagination-info">Page <b>{currentPage}</b> of <b>{totalPages}</b></span>
				
				<button className="Pagination-button" onClick={() => this.setPage("next")} disabled={currentPage >= totalPages}>
					&rarr;
				</button>
			</div>
		)
	}
}

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	handleSetPage: PropTypes.func.isRequired
}

export default Pagination;