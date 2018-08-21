import React from 'react';
import { connect } from 'react-redux';
import { CheckoutComponent } from '../components/checkoutComponent';
import { getUserDetail,order } from '../redux/actions/cartAction'

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handlePinCode = this.handlePinCode.bind(this);
    this.handleState = this.handleState.bind(this);
    this.submitAddress = this.submitAddress.bind(this);
    const address ={
      address:'',
      city:'',
      pinCode:'',
      state:'',
      customerId:''
    };
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

  handleAddress(e) {
   
    this.address = {
      ...this.address,
      address : e.target.value
    }
  }

  handleCity(e) {
    this.address ={
      ...this.address,
      city : e.target.value
    }
  }

  handlePinCode(e) {
   this.address ={
     ...this.address,
     pinCode: e.target.value
   }
  }

  handleState(e){
    this.address = {
      ...this.address,
      state: e.target.value
    }
  }

  submitAddress(){
    this.address = {
      ...this.address,
      customerId : this.props.login.customerId
    };
   const orderDetails = this.props.cart.cartItems;
    this.props.order(this.address,orderDetails);
  }

  render() {
    return (
      <CheckoutComponent
        user={this.props.login.user}
        handleAddress={(e) => this.handleAddress(e)}
        handleCity={(e) => this.handleCity(e)}
        handlePinCode={(e) => this.handlePinCode(e)}
        handleState={(e) => this.handleState(e)}
        submitAddress={this.submitAddress}
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
    },

    order: (address,orderDetails) =>{
      dispatch(order(address,orderDetails));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);