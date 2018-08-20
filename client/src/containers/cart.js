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
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleContinueShopping = this.handleContinueShopping.bind(this);
    const item = false;
  }

  handleRemoveItemCart(product) {
    this.props.removeItemCart(product)
  }

  handleCheckout() {
    // if(this.props.login.isLogin){
    this.props.history.push('/Checkout');
    // }
    // else{
    //   this.props.history.push('/');
    // }

  }

  handleContinueShopping() {
    this.props.history.push('/Home');
  }
  render() {
    if (this.props.cart.cartItems.length > 0) {
      this.item = true;
    }
    let total = 0;
    let save = 0;
    this.props.cart.cartItems.map((product, index) => {
      total +=  product.UnitPrice;
      save = save + product.Discount;
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <div className="panel panel-info">
              <div className="panel-heading">
                <div className="panel-title">
                  <div className="row">
                    <div className="col-sm-6">
                      <h5><span className="glyphicon glyphicon-shopping-cart"></span> Shopping Cart</h5>
                    </div>
                    <div className="col-sm-6">
                      <Button
                        class="btn btn-primary btn-sm btn-block"
                        name="&#x21b7; Continue shopping"
                        click={this.handleContinueShopping} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                {this.props.cart.cartItems.map((product, index) => {
                  if (this.props.cart.cartItems.length > 0) {
                    return (
                      <div className="row" key={index}>
                        <div className="col-md-2"><img className="img-thumbnail img-responsive" src={window.location.origin + '/images/' + product.image} alt={product.image} />
                        </div>
                        <div className="col-md-4">
                          <h4 className="product-name"><strong>{product.ProductName}</strong></h4><h4><small>{product.ProductDescription}</small></h4>
                        </div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-4 text-right">
                              <h6><strong> {product.UnitPrice - product.Discount}&#36; <span className="text-muted">x</span></strong></h6>
                            </div>
                            <div className="col-md-4 col-sm-2">
                              <input type="text" className="form-control input-sm" defaultValue="1" disabled />
                            </div>
                            <div className="col-md-4 col-sm-2">
                              <Button
                                name="Remove" class="btn btn-primary"
                                click={() => this.handleRemoveItemCart(product)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                }
                )}
                {this.item ?
                  <div className="panel-footer">
                    <div className="row">
                      <div className="col-md-4 offset-2">
                       <strong> Total :</strong>
                      </div>
                      <div className="col-md-4 offset-2">
                        <strong>{total}&#36;</strong>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 offset-2">
                        <strong>Discount :</strong>
                      </div>
                      <div className="col-md-4 offset-2">
                        <strong>{save}&#36;</strong>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 offset-2">
                        <strong>Delevery Charges :</strong>
                      </div>
                      <div className="col-md-4 offset-2">
                        <strong>{total > 500 ? 'Free' : 50 } </strong>
                      </div>
                    </div>
                    <div className="row text-center">
                      <div className="col-md-9">
                        <h4 className="text-right">Pay <strong>{total> 500 ?total-save : total -save +50 } &#36;</strong></h4>
                      </div>
                      <div className="col-md-3">
                        <Button class="btn btn-success btn-block" name="Place Order" click={this.handleCheckout} />
                      </div>
                    </div>
                  </div> :
                  <div>No item is added in the Cart Yet</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    login: state.login
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