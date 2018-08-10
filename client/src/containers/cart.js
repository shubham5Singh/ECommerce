import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeItemCart } from '../redux/actions/cartAction';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';

import './cart.css';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveItemCart = this.handleRemoveItemCart.bind(this);
    const item = false;
  }

  handleRemoveItemCart(product) {
    this.props.removeItemCart(product)
  }
  render() {
    if (this.props.cart.cartItems.length > 0) {
      this.item = true;
    }
    return (
      <div className="container">
        <div className="row">
          <h1>Cart Items</h1>
        </div>
        {this.props.cart.cartItems.map((product, index) => {
          if (this.props.cart.cartItems.length > 0) {
            return (
              <div className="row cart" key={index}>
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
                    <Button
                      name="Remove From Cart"
                      click={() => this.handleRemoveItemCart(product)}
                    />
                  </div>
                </div>
              </div>
            );
          }
        }
        )}
        {this.item ? 
         <div className="row">
         <div className="col-sm-4 col-md-4">
           <Link to="/Home">Back</Link>
         </div>
         <div className="offset-4 col-sm-4 col-md-4">
           <Button name="Checkout" />
         </div>
       </div> :
      <div>No item is added in the Cart Yet</div>}
       
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
    removeItemCart: (product) => {
      dispatch(removeItemCart(product));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));   