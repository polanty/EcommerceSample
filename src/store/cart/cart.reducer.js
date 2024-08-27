////default name to avoid user error

export const DEFAULT_VARIABLE_NAMES = {
  CART_ITEMS: "CART_ITEMS",
  IS_CART_OPEN: "IS_CART_OPEN",
};

//initial state of all the values passed in to be handled by the reducer within the exporting context
const INITIAL_CART_REDUCERSTATE = {
  isCartOpen: false,
  cartItems: [],
};

export const CartReducer = (state = INITIAL_CART_REDUCERSTATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case DEFAULT_VARIABLE_NAMES.CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case DEFAULT_VARIABLE_NAMES.IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      return state;
  }
};
