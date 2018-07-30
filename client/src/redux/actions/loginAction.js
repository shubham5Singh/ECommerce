import axios from 'axios';

export function login(_email, _password) {
  return (dispatch) => {
    axios.post('http://localhost:8080/admin/login', {
      email: _email,
      password: _password
    }).then((response) => {
      if (response.status === 200) {
        if (response.data.message === 'Login Successful') {
          dispatch({
            type: 'LOG_IN',
            payload: true
          });
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
      console.log('error');
    });
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