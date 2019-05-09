import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from "mdbreact";
import { If, Then, Else } from 'react-if-elseif-else-render';
import FetchData from '../services/FetchData';

class ProductDetail extends Component {
	
	constructor(props) {
		super(props);
		this.fetchData = new FetchData();
		this.state = {}
	}

	componentDidMount () {
		this.fetchData.retrieveSelectedProduct(this.props.item)
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

	renderData (data) {
		if (data) {
			return (
				<MDBCard style={{ margin: 1 + "em" }}>
					<MDBCardBody>
						<If condition={data.stock === "NA"}>
							<Then>
								<MDBCardText>-</MDBCardText>
							</Then>
							<Else>
								<MDBCardText>{data.stock}</MDBCardText>
							</Else>
						</If>
						<MDBCardTitle>{data.bundle_name}</MDBCardTitle>
						<MDBCardText>{data.sku}</MDBCardText>
					</MDBCardBody>
					<MDBContainer>
						<MDBCardImage src={data.thumbnail} alt="" style={{ width: 150, height: 150 }}/>
						<MDBRow>
						<If condition={data.your_price === "NA"}>
							<Then>
								<MDBCol>YOUR PRICE<br></br>-</MDBCol>
							</Then>
							<Else>
								<MDBCol>YOUR PRICE<br></br>{data.your_price}</MDBCol>
							</Else>
						</If>
						</MDBRow><hr></hr>
						<MDBRow>
						<If condition={data.lowest_price_value === "NA"}>
							<Then>
								<MDBCol>LOWEST PRICE<br></br>-</MDBCol>
							</Then>
							<Else>
								<MDBCol>LOWEST PRICE<br></br>{data.lowest_price_value}</MDBCol>
							</Else>
						</If>
						</MDBRow><hr></hr>
						<MDBRow>
						<If condition={data.highest_price_value === "NA"}>
							<Then>
								<MDBCol>HIGHEST PRICE<br></br>-</MDBCol>
							</Then>
							<Else>
								<MDBCol>HIGHEST PRICE<br></br>{data.highest_price_value}</MDBCol>
							</Else>
						</If>
						</MDBRow>
					</MDBContainer>
				</MDBCard>
			);
		} else {
			return <div>No items found</div>
		}
	}

	renderLoading () {
		return <div>Loading...</div>
	}
}

export default ProductDetail;