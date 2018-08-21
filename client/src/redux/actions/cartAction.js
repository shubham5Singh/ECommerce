import axios from 'axios';

export function order(_address,_orderDetails){
  return (dispatch) =>{
    axios.post('http://localhost:8080/orders',{
      address:_address,
      orderDetails:_orderDetails
    }).then((response) =>{
      console.log(response);
    }).catch((err) =>{
      console.log(err);
    })
  }
}

export function getUserDetail(customerId){
  return (dispatch) =>{
    axios.get('http://localhost:8080/users/'+customerId)
    .then((response) =>{
      dispatch({
        type:'USER',
        payload:response.data.data
      })
    }).catch(err =>{
      console.log('error',err);
    })
  }
}

export function addToCart(product) {
  return (dispatch) => {
    product = {
      ...product,
      Quantity : 1
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: product
    });
  }
}

export function removeItemCart(product) {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_CART_ITEM',
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

export function singleProductDescription(productId) {
  return (dispatch) => {
    axios.get('http://localhost:8080/products/'+productId)
      .then((response) => {
       dispatch({
         type:'SEARCH_PRODUCT',
         payload:response.data.data[0] 
       }) 
      }).catch((error) => {
        console.log(error);
      });
  }
}