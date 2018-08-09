const cartReducer = (state = {
  products: [],
  cartItems:[]
}, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      state = {
        ...state,
        cartItems: [...state.cartItems,action.payload]
      };
      break;
      case 'GET_PRODUCTS':
      state ={
        ...state,
        products: action.payload
      }
      break;
      case 'REMOVE_ADDED_PRODUCT':
      state={
        ...state,
        product: state.products.splice(state.products.indexOf(action.payload),1)
      }
      break;
    default:
      return state;
  }
  return state;
}

export default cartReducer;