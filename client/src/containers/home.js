import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../components/header';
import { Product } from '../components/products';
import { addToCart, getProducts } from '../redux/actions/cartAction';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddtoCart = this.handleAddtoCart.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      searchProduct:[]
    }
  }
  componentDidMount() {
    this.props.getProducts();
  }

  handleAddtoCart() {
    this.props.addToCart();
  }

  handleSearch(e){
    this.props.cart.products.filter((product) =>{
      if(product.ProductName.toLowerCase().includes((e.target.value).toLowerCase())){
        this.setState({
          searchProduct://fill the product here
        })
      }
     
    })
  }
  render() {
    return (
      <div>
        <Header
          items={this.props.cart.numberOfItem}
          isLogin={this.props.login.isLogin}
          name={this.props.login.email}
          handleSearch={this.handleSearch}
        />
        <Product
          handleAddToCart={this.handleAddtoCart}
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
    addToCart: () => {
      dispatch(addToCart());
    },

    getProducts: () => {
      dispatch(getProducts());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));   