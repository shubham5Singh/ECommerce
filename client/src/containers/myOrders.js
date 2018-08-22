import React from 'react';
import { connect } from 'react-redux';
import Header from '../containers/header';
class MyOrder extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Header />
        My Orders
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


export default connect(mapStateToProps)(MyOrder);