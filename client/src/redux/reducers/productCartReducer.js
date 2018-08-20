const cartReducer = (state = {
  products: [],
  searchProduct: {},
  cartItems: []
}, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
    let index =0;
    let value = state.products.filter((product) =>{
        if(product.ProductId===action.payload.ProductId){
           index = state.products.indexOf(product);
        }
      });
      state = {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        products: [...state.products.slice(0, index), ...state.products.slice(index + 1)]
      };
      return state;
      break;
    case 'GET_PRODUCTS':
      state = {
        ...state,
        products: action.payload
      }
      return state;
      break;
    case 'REMOVE_CART_ITEM':
      const index2 = state.cartItems.indexOf(action.payload);
      state = {
        ...state,
        cartItems: [...state.cartItems.slice(0, index2), ...state.cartItems.slice(index2 + 1)],
        products: [...state.products, action.payload]
      }
      return state;
      break;
    case 'SEARCH_PRODUCT':
      state = {
        ...state,
        searchProduct: action.payload
      }
      return state;
      break;
    default:
      return state;
      break;
  }
}

export default cartReducer;