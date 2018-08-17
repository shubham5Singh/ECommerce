import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import { Product } from '../components/products';
import { addToCart, getProducts } from '../redux/actions/cartAction';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddtoCart = this.handleAddtoCart.bind(this);
    this.handleView = this.handleView.bind(this);
  }
  
  componentDidMount() {
    if(this.props.cart.products.length===0){
      this.props.getProducts();
    }
  }

  handleAddtoCart(product) {
    this.props.addToCart(product);
  }

  handleView(productId){
    this.props.history.push('/ProductDeatil/'+productId);
  }

  render() {
    return (
      <div>
        <Header />
        <Product
          handleAddToCart={(product) => this.handleAddtoCart(product)}
          handleView={(productId) => this.handleView(productId)}
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));   