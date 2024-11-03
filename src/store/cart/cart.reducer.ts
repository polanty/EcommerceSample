import { CategoryItem } from "../categories/category-reducer";
import { AnyAction } from "redux-saga";
import { setCartItems, setIsCartOpen } from "./cart.action";

export enum DEFAULT_VARIABLE_NAMES {
  CART_ITEMS = "CART_ITEMS",
  IS_CART_OPEN = "IS_CART_OPEN",
}

export type CartItem = CategoryItem & { quantity: number };

export type CartState = {
  isCartOpen: boolean;
  cartItems: Array<CartItem>;
};

//initial state of all the values passed in to be handled by the reducer within the exporting context
const INITIAL_CART_REDUCERSTATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const CartReducer = (
  state = INITIAL_CART_REDUCERSTATE,
  action: AnyAction
): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;

  // const { type, payload } = action;
  //main switch function for reducer before i had to update for typescript
  // switch (type) {
  //   case DEFAULT_VARIABLE_NAMES.CART_ITEMS:
  //     return {
  //       ...state,
  //       cartItems: payload,
  //     };
  //   case DEFAULT_VARIABLE_NAMES.IS_CART_OPEN:
  //     return {
  //       ...state,
  //       isCartOpen: payload,
  //     };

  //   default:
  //     return state;
  // }
};
