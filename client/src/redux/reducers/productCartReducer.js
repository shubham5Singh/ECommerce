const cartReducer = (state = {
  products: [],
  cartItems: []
}, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const index = state.products.indexOf(action.payload);
      state = {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        products: [...state.products.slice(0, index), ...state.products.slice(index + 1)]
      };
      break;
    case 'GET_PRODUCTS':
      state = {
        ...state,
        products: action.payload
      }
      break;
    case 'REMOVE_CART_ITEM':
      const index2 = state.cartItems.indexOf(action.payload);
      state = {
        ...state,
        cartItems: [...state.cartItems.slice(0, index2), ...state.cartItems.slice(index2 + 1)]
      }
      break;
    default:
      return state;
      break;
  }
  return state;
}

export default cartReducer;