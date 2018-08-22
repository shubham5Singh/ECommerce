
import axios from 'axios';

export function login(_email, _password,history) {
  return (dispatch) => {
    axios.post('http://localhost:8080/users/login', {
      email: _email,
      password: _password
    }).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        if (response.data.message === 'Login Successful') {
          dispatch({
            type: 'LOG_IN',
            payload: true,
            customerId: response.data.user.CustomerId
          });
          if(history.location.pathname==='/'){
            history.push('/Home');
          }
          else{
            history.push(history.location.pathname);
          }
          
        }
        else if (response.data.message === 'Invalid User') {
          dispatch({
            type: 'LOG_IN',
            payload: false
          });
        }
      }
    }).catch((error) => {
      //
      console.log(error);
    });
  }
}

export function logOut(history){
  return (dispatch) =>{
    dispatch({
      type:'LOG_OUT',
      payload:false
    });
    history.push('/Home');
  }
}

export function setEmail(email) {
  return (dispatch) => {
    dispatch({
      type: 'SET_EMAIL',
      payload: email
    });
  }
}

export function setPassword(password) {
  return (dispatch) => {
    dispatch({
      type: 'SET_PASSWORD',
      payload: password
    })
  }
}