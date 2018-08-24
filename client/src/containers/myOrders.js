import React from 'react';
import { connect } from 'react-redux';
import Header from '../containers/header';
import { getOrderByCustomer } from '../redux/actions/cartAction';
import { OrderComponent } from '../components/myOrder';
class MyOrder extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.login.isLogin) {
      this.props.getOrders(this.props.login.customerId);
    }
    else {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        <Header />
        <OrderComponent
          orders={this.props.login.myOrders}
        />
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

const mapDispatchToState = (dispatch) => {
  return {
    getOrders: (customerId) => {
      dispatch(getOrderByCustomer(customerId));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToState)(MyOrder);