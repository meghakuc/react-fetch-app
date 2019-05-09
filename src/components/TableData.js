import React, { Component } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from "mdbreact";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import ProductDetail from './ProductDetail';

class TableData extends Component {
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
		if(this.props.obj.stock === "in stock") {
			return (
				<div onClick={() => this.onSelect(this.props.obj.bundle_name)} className="nav-link">
					<MDBCard>
						<MDBContainer>
							<MDBCardBody>
								<MDBCardText>₹{this.props.obj.available_price}</MDBCardText>
								<MDBCardTitle>{this.props.obj.bundle_name}</MDBCardTitle>
								<MDBCardText>{this.props.obj.sku}</MDBCardText>
								<If condition={(this.props.obj.price_opportunity_increase_by === "NA")&&(this.props.obj.price_opportunity_increase_by_percentage === "NA")}>
									<Then>
										<MDBCardText>Increase upto ₹- ({"-%"})</MDBCardText>
									</Then>
									<ElseIf condition={this.props.obj.price_opportunity_increase_by === "NA"}>
										<MDBCardText>Increase upto ₹- ({this.props.obj.price_opportunity_increase_by_percentage+"%"})</MDBCardText>
									</ElseIf>
									<ElseIf condition={this.props.obj.price_opportunity_increase_by_percentage === "NA"}>
										<MDBCardText>Increase upto ₹{this.props.obj.price_opportunity_increase_by} ({"-%"})</MDBCardText>
									</ElseIf>
									<Else>
										<MDBCardText>
											Increase upto ₹{this.props.obj.price_opportunity_increase_by} ({this.props.obj.price_opportunity_increase_by_percentage+"%"})
										</MDBCardText>
									</Else>
								</If>
								<MDBCardText>Opportunity exists from last {this.props.obj.price_opportunity_days} day(s)</MDBCardText>			
							</MDBCardBody>
							<MDBCardImage src={this.props.obj.bundle_image} alt="" style = {{ width: 150, height: 150 }}/>
						</MDBContainer>						
					</MDBCard>
					{showDetails && selectedItem && <ProductDetail item={selectedItem}/>}
				</div>	
			);
		} else if(this.props.obj.is_valid === 0) {
			return (
				<div onClick={() => this.onSelect(this.props.obj.bundle_name)} className="nav-link">
					<MDBCard>
						<MDBContainer>
							<MDBCardBody>
								<MDBCardTitle>{this.props.obj.bundle_name}</MDBCardTitle>
								<MDBCardText>{this.props.obj.sku}</MDBCardText>
								<MDBCardText>Product not available</MDBCardText>	
							</MDBCardBody>
							<MDBCardImage src={this.props.obj.bundle_image} alt="" style = {{ width: 150, height: 150 }}/>
						</MDBContainer>
					</MDBCard>	
					{showDetails && selectedItem && <ProductDetail item={selectedItem}/>}
				</div>
			);
		} else {
			return (
				<div onClick={() => this.onSelect(this.props.obj.bundle_name)} className="nav-link">
					<MDBCard>
						<MDBContainer>
							<MDBCardBody>
								<MDBCardTitle>{this.props.obj.bundle_name}</MDBCardTitle>
								<MDBCardText>{this.props.obj.sku}</MDBCardText>
								<If condition={this.props.obj.out_of_stock_seed_days === "NA"}>
									<Then>
										<MDBCardText>Out of stock from - day(s)</MDBCardText>
									</Then>
									<Else>
										<MDBCardText>Out of stock from {this.props.obj.out_of_stock_seed_days} day(s)</MDBCardText>
									</Else>
								</If>
							</MDBCardBody>
							<MDBCardImage src={this.props.obj.bundle_image} alt="" style = {{ width: 150, height: 150 }}/>
						</MDBContainer>
					</MDBCard>
					{showDetails && selectedItem && <ProductDetail item={selectedItem}/>}
				</div>
			);
		}
	}
}

export default TableData;
