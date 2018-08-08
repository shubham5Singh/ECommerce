const cartReducer = (state = {
  products: [],
  numberOfItem: 0
}, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      state = {
        ...state,
        numberOfItem: state.numberOfItem + action.payload
      };
      break;
      case 'GET_PRODUCTS':
      state ={
        ...state,
        products: action.payload
      }
    default:
      return state;
  }
  return state;
}

export default cartReducer;