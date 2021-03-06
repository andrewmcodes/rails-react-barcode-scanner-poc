import React from 'react';
import AllProducts from './all_products';
import FindProduct from './find_product';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      barcode: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.getFindProduct = this.getFindProduct.bind(this);
  }

  componentDidMount() {
    fetch('/api/v1/products.json')
      .then(response => response.json())
      .then((data) => {
        this.setState({ products: data });
      });
  }

  getFindProduct(product) {
    if (product === undefined) {
      alert("Product doesn't exist");
    } else {
      alert(product.name);
    }
  }

  // 070989105591
  handleFormSubmit(barcode) {
    this.state.products.forEach((key) => {
      if (key.barcode === barcode) {
        this.state.barcode = key.id;
      }
    });
    fetch(`https://stormy-garden-24685.herokuapp.com//api/v1/products/${this.state.barcode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: undefined,
    })
      .then(response => response.json())
      .then((barcode) => {
        this.getFindProduct(barcode);
      });
  }

  render() {
    return (
      <div>
        <FindProduct handleFormSubmit={this.handleFormSubmit} />
        <AllProducts products={this.state.products} />
      </div>
    );
  }
}

export default Body;
