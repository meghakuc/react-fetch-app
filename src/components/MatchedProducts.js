import React, { Component } from 'react';
import TableData from './TableData';
import FetchData from '../services/FetchData';

class MatchedProducts extends Component {
	
	constructor(props) {
		super(props);
		this.fetchData = new FetchData();
		this.state = {}
	}

	componentDidMount () {
		this.fetchData.retrieveAllMatchedProducts()
		.then(this.onLoad);
	}

	parseData (response) {
		return response.data;
	}

	onLoad = (data) => {
		this.setState({
			data: this.parseData(data)
		});
	}

	render () {
		const { data } = this.state;
		return data ?
		  this.renderData(data) :
		  this.renderLoading()
	}
	
	tabData(){
		return this.state.data.map(function(object, i){
			return <TableData obj={object} key={i} />;
		});
	}
	
	renderData (data) {
		if (data && data.length) {
			return (
				<div>
					<div key={data.bundle_id}>
						{ this.tabData() }
					</div> 
				</div>
			);
		} else {
			return <div>No items found</div>
		}
	}

	renderLoading () {
		return <div>Loading...</div>
	}
}

export default MatchedProducts;