import React, { Component } from 'react';
import AllProductsData from './AllProductsData';
import FetchData from '../services/FetchData';

class AllProducts extends Component {

	constructor(props) {
		super(props);
		this.fetchData = new FetchData();
		this.state = {}
	}

	componentDidMount () {
		this.fetchData.retrieveAllProducts()
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
	
	allProductsData(){
		return this.state.data.map(function(object, i){
			return <AllProductsData obj={object} key={i} />;
		});
	}
	
	renderData (data) {
		if (data && data.length) {
			return (
				<div>
					<div key={data.bundle_id}>
						{ this.allProductsData() }
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

export default AllProducts;