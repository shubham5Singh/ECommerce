const loginReducer = (state = {
  isLogin: false,
  email: '',
  password: '',
  customerId: '',
  user: {},
  redirectUrl: '',
  myOrders: []
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
        isLogin: action.payload,
        customerId: action.customerId
      }
      break;
    case 'LOG_OUT':
      state = {
        ...state,
        isLogin: action.payload,
        customerId: ''
      }
      break;
    case 'USER':
      state = {
        ...state,
        user: action.payload
      }
      break;
    case 'MY_ORDER':
      state = {
        ...state,
        myOrders: action.payload
      }
      break;
      case 'REGISTER':
      state = {
        ...state,
        isLogin:true,
        user:action.payload,
        customerId:action.payload.CustomerId,
        email:action.payload.Email,
        password:action.payload.Password
      }
      break;
    default:
      return state;
  }
  return state;
};

export default loginReducer;