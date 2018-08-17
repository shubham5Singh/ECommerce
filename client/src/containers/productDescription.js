import React from 'react';
import { connect } from 'react-redux';
import { singleProductDescription , addToCart} from '../redux/actions/cartAction';
import { withRouter } from 'react-router-dom';
import { ProductView } from '../components/productDescriptionComponent';
import Header from './header';

class ProductDescription extends React.Component {
  constructor(props){
    super(props);
    this.handleAddtoCart = this.handleAddtoCart.bind(this);
  }

  handleAddtoCart(product){
    this.props.addToCart(product);
    this.props.history.push('/Home');
   
  }

  componentDidMount() {
    this.props.singleProductDescription(this.props.match.params.value);
  }
  componentWillReceiveProps(newProps) {
    if(this.props.match.params.value!==newProps.match.params.value){
      newProps.singleProductDescription(newProps.match.params.value);
    }
  }
  render() {
    return (
      <div>
        <Header />
        <ProductView
          product={this.props.cart.searchProduct}
          handleAddtoCart = {(product) =>this.handleAddtoCart(product)}
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
    addToCart: (product) => {
      dispatch(addToCart(product));
    },

    singleProductDescription: (productId) => {
      dispatch(singleProductDescription(productId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDescription));  