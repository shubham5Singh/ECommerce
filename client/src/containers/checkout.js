import React from 'react';
import { connect } from 'react-redux';
import { CheckoutComponent } from '../components/checkoutComponent';
import { getUserDetail } from '../redux/actions/cartAction'
class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // if (!this.props.login.isLogin) {
    //   // this.props.history.push('/');
    // }
    // else{
    //get the customer id and get the user details
    this.props.getUserDetail(this.props.login.customerId);
    // }
  }

  render() {
    return (
      <CheckoutComponent
      user = {this.props.login.user}
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

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetail: (customerId) => {
      dispatch(getUserDetail(customerId));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);