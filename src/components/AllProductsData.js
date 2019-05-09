import React, { Component } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from "mdbreact";
import ProductDetail from './ProductDetail';

class AllProductsData extends Component {
	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
		this.state = {
			showDetails: false,
			selectedItem: null
		}
	}
	
	onSelect(itemName) {
		this.clearState();
		this.setState({
			showDetails: true,
			selectedItem: this.props.obj.bundle_id
		});
	}
	
	clearState() {
		this.setState({
			showDetails: false,
			selectedItem: null
		});
	}
	
	render() {
		const showDetails = this.state.showDetails;
		const selectedItem = this.state.selectedItem;
		return (
			<div onClick={() => this.onSelect(this.props.obj.bundle_name)} className="nav-link">
				<MDBCard>
					<MDBContainer>
						<MDBCardBody>
							<MDBCardText>₹{this.props.obj.available_price}</MDBCardText>
							<MDBCardTitle>{this.props.obj.bundle_name}</MDBCardTitle>
							<MDBCardText>{this.props.obj.sku}</MDBCardText>
							<MDBCardTitle>{this.props.obj.brand}</MDBCardTitle>			
						</MDBCardBody>
						<MDBCardImage src={this.props.obj.bundle_image} alt="" style = {{ width: 150, height: 150 }}/>
					</MDBContainer>						
				</MDBCard>
				{showDetails && selectedItem && <ProductDetail item={selectedItem}/>}
			</div>	
		);
	}
}

export default AllProductsData;