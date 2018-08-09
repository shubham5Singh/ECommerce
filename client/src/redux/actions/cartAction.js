import axios from 'axios';

export function addToCart(product) {
  return (dispatch) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: product
    });
      dispatch({
        type: 'REMOVE_ADDED_PRODUCT',
        payload: product
      });
  }
}

export function getProducts() {
  return (dispatch) => {
    axios.get('http://localhost:8080/products')
      .then((response) => {
        dispatch({
          type: 'GET_PRODUCTS',
          payload: response.data.data
        })
      }).catch((error) => {
        console.log(error);
      });
  }
}