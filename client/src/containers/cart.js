import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart, getProducts } from '../redux/actions/cartAction';
import { Button } from '../components/button';
class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        {this.props.cart.cartItems.map((product, index) => {
          if (product) {
            return (
              	<div className="row" key={index}>
                <div className="col-sm-4">
                  <img className="img-thumbnail" src={window.location.origin + '/images/Penguins.jpg'} alt="Penguins" />
                </div>
                <div className="col-sm-8">
                  <div className="row">
                    {product.ProductName}
                  </div>
                  <div className="row">
                    {product.ProductDescription}
                  </div>
                  <div className="row">
                    Price: {product.UnitPrice}
                  </div>
                  <div className="row">
                    Quantity: 1
                  </div>
                  <div className="row">
                    <Button name="Remove From Cart"/>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));   