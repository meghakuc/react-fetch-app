import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MatchedProducts from './components/MatchedProducts';
import MarginGain from './components/MarginGain';
import AllProducts from './components/AllProducts';
import FetchData from './services/FetchData';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.fetchData = new FetchData();
		this.state = {}
	}
	
	componentDidMount() {
		this.fetchData.retrieveProducts()
		.then(this.onLoad);
	}
	
	parseAllProductsData (response) {
		return response[0].data;
	}

	parseMatchedProductsData (response) {
		return response[1].data;
	}
	
	parseMarginGainData (response) {
		return response[2].data;
	}

	onLoad = (data) => {
		this.setState({
		  allProductsData: this.parseAllProductsData(data),
		  matchedProductsData: this.parseMatchedProductsData(data),
		  marginGainData: this.parseMarginGainData(data)
		});
	}

	render () {
		const { allProductsData, matchedProductsData, marginGainData } = this.state;
		return matchedProductsData ?
		  this.renderData(allProductsData, matchedProductsData, marginGainData) :
		  this.renderLoading()
	}
	
	renderData(allProductsData, matchedProductsData, marginGainData) {
		if (matchedProductsData) {
			return (
				<div className="outerDiv">
					<div className="container">
						<div className="left-col">
							<table>
								<tbody>
									<tr>
										<td><h2>Views</h2></td>
									</tr>
									<tr>
										<td>All products</td>
										<td><Link to='/allproducts' className="nav-link">{allProductsData.length}</Link></td>
									</tr>
									<tr>
										<td>All matched products</td>
										<td><Link to='/matchedproducts' className="nav-link">{matchedProductsData.length}</Link></td>
									</tr>
									<tr>
										<td>Margin gain opportunities</td>
										<td><Link to='/margingain' className="nav-link">{marginGainData.length}</Link></td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="center-col" id="center-div">
							<Switch>
								<Route exact path='/' component={ AllProducts } />
								<Route path='/allproducts' component={ AllProducts } />
								<Route path='/matchedproducts' component={ MatchedProducts } />
								<Route path='/margingain' component={ MarginGain } />
							</Switch>
						</div>	
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

export default App;