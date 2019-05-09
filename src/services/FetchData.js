import Configuration from './configuration';

class FetchData {

  constructor() {
    this.config = new Configuration();
  }

  async retrieveProducts() {
    return Promise.all([
		fetch(this.config.ALL_PRODUCTS_URL),
		fetch(this.config.MATCHED_ALL_PRODUCTS_URL),
		fetch(this.config.MARGIN_GAIN_URL),
	])
	.then(([res1, res2, res3]) => Promise.all([
		res1.json(),
		res2.json(),
		res3.json(),
	]))
    .catch(error => {
		this.handleError(error);
    });
  }
  
  async retrieveAllProducts() {
    return fetch(this.config.ALL_PRODUCTS_URL)
		.then(res => {
			if (!res.ok) {
				this.handleResponseError(res);
			}
			return res.json();
		})
    .catch(error => {
		this.handleError(error);
    });
  }
  
  async retrieveAllMatchedProducts() {
    return fetch(this.config.MATCHED_ALL_PRODUCTS_URL)
		.then(res => {
			if (!res.ok) {
				this.handleResponseError(res);
			}
			return res.json();
		})
    .catch(error => {
		this.handleError(error);
    });
  }
  
  async retrieveMarginGainProducts() {
    return fetch(this.config.MARGIN_GAIN_URL)
		.then(res => {
			if (!res.ok) {
				this.handleResponseError(res);
			}
			return res.json();
		})
    .catch(error => {
		this.handleError(error);
    });
  }
  
  async retrieveSelectedProduct(itemID) {
    return fetch(this.config.ITEM_DETAIL_URL+itemID)
		.then(res => {
			if (!res.ok) {
				this.handleResponseError(res);
			}
			return res.json();
		})
    .catch(error => {
		this.handleError(error);
    });
  }
  
  handleResponseError(response) {
	throw new Error("HTTP error, status = " + response.status);
  }

  handleError(error) {
    console.log(error.message);
  }
}

export default FetchData;
