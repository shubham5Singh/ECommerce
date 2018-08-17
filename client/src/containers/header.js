import React from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../components/header';
import { logOut } from '../redux/actions/loginAction';
import { withRouter } from 'react-router-dom';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout(this.props.history);
  }

  render() {
    return (
      <div>
        <HeaderComponent
          items={this.props.cart.cartItems.length}
          isLogin={this.props.login.isLogin}
          name={this.props.login.email}
          handleLogout={this.handleLogout}
          products={this.props.cart.products}
        />
      </div>
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
    logout: (history) => {
      dispatch(logOut(history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));   