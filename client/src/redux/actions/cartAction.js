import axios from 'axios';

export function addToCart() {
  return (dispatch) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: 1
    });
  }
}

export function getProducts() {
  return (dispatch) => {
    axios.get('http://localhost:8080/products')
      .then((response) => {
        dispatch({
          type:'GET_PRODUCTS',
          payload: response.data.data
        })
      }).catch((error) => {
        console.log(error);
      });
  }
}