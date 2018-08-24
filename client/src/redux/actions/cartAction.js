import axios from 'axios';
import swal from 'sweetalert2';

export function getOrderByCustomer(customerId){
  return (dispatch) =>{
    axios.get('http://localhost:8080/orders/ByCustomer/'+customerId)
      .then(response =>{
        if(response.status===200&&response.data.message!=='No record Found'){
          dispatch({
            type: 'MY_ORDER',
            payload:response.data.data
          });
        }
      }).catch(err =>{
        console.log(err);
      })
  }
}
export function order(_address, _orderDetails, history) {
  return (dispatch) => {
    axios.post('http://localhost:8080/orders', {
      address: _address,
      orderDetails: _orderDetails
    }).then((response) => {
      if (response.status === 201) {
        if (response.data.message === 'Order Created') {
          dispatch({
            type: 'CLEAR_CART',
            payload: true
          });
          const toast = swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2000
          });
          toast({
            type: 'success',
            title: 'Order successfully'
          })
          history.push('/Home');

        }
      }
    }).catch((err) => {
      console.log(err);
    })
  }
}

export function getUserDetail(customerId) {
  return (dispatch) => {
    axios.get('http://localhost:8080/users/' + customerId)
      .then((response) => {
        dispatch({
          type: 'USER',
          payload: response.data.data
        })
      }).catch(err => {
        console.log('error', err);
      })
  }
}

export function addToCart(product) {
  return (dispatch) => {
    product = {
      ...product,
      Quantity: 1
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
    axios.get('http://localhost:8080/products/' + productId)
      .then((response) => {
        dispatch({
          type: 'SEARCH_PRODUCT',
          payload: response.data.data[0]
        })
      }).catch((error) => {
        console.log(error);
      });
  }
}