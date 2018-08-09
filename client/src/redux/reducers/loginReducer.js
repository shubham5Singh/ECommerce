const loginReducer = (state = {
  isLogin: false,
  email: '',
  password: '',
}, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      state = {
        ...state,
        email: action.payload
      };
      break;
    case 'SET_PASSWORD':
      state = {
        ...state,
        password: action.payload
      }
      break;
    case 'LOG_IN':
      state = {
        ...state,
        isLogin: action.payload
      }
      break;
    case 'LOG_OUT':
    state ={
      ...state,
      isLogin: action.payload
    }
    default:
      return state;
  }
  return state;
};

export default loginReducer;