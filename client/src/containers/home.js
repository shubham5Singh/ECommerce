import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../components/header';
import { Product } from '../components/products';
import { addToCart, getProducts } from '../redux/actions/cartAction';
import { logOut } from '../redux/actions/loginAction';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddtoCart = this.handleAddtoCart.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      searchProduct: []
    }
  }
  componentDidMount() {
    this.props.getProducts();
  }

  handleAddtoCart(product) {
    this.props.addToCart(product);
  }

  handleSearch(e) {
    this.setState({
      searchProduct: []
    });
    this.props.cart.products.filter((product) => {
      if (product.ProductName.toLowerCase().includes((e.target.value).toLowerCase())) {
        this.setState({
          searchProduct: [...this.state.searchProduct, product]
        });
        console.log(this.state.searchProduct);
      }
    })
  }
 
  handleLogout() {
    this.props.logout(this.props.history);
  }

  render() {
    return (
      <div>
        <Header
          items={this.props.cart.cartItems.length}
          isLogin={this.props.login.isLogin}
          name={this.props.login.email}
          handleSearch={this.handleSearch}
          handleLogout={this.handleLogout}
        />
        <Product
          handleAddToCart={(product) => this.handleAddtoCart(product)}
          products={this.props.cart.products} />
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
    addToCart: (product) => {
      dispatch(addToCart(product));
    },

    getProducts: () => {
      dispatch(getProducts());
    },

    logout: (history) => {
      dispatch(logOut(history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));   