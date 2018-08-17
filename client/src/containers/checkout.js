import React from 'react';
import { connect } from 'react-redux';
import { CheckoutComponent } from '../components/checkoutComponent';
class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!this.props.login.isLogin) {
      // this.props.history.push('/');
    }
  }
  render() {
    let total =0 ;
    let save=0;
    this.props.cart.cartItems.map((product, index) => {
      total = total + product.UnitPrice;
      save = save + product.Discount;
    })
    return (
      <CheckoutComponent
        products={this.props.cart.cartItems}
        total={total}
        save= {save}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    login: state.login
  };
};


export default connect(mapStateToProps)(Checkout);