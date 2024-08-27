import { DEFAULT_VARIABLE_NAMES } from "./cart.reducer";
import { createAction } from "../genericActionCreator";
import {
  addToCart,
  removeItem,
  removeSingleCartItem,
} from "../../contexts/cardToggle.context";

export const addItemsToCart = (cartItems, productToAdd) => {
  const newCart = addToCart(cartItems, productToAdd);

  return createAction(DEFAULT_VARIABLE_NAMES.CART_ITEMS, newCart);
};

export const removeItemFromCart = (cartItems, productToAdd) => {
  const newCart = removeItem(cartItems, productToAdd);

  return createAction(DEFAULT_VARIABLE_NAMES.CART_ITEMS, newCart);
};

export const removeSingleItemFromCart = (cartItems, productToAdd) => {
  const newCart = removeSingleCartItem(cartItems, productToAdd);

  return createAction(DEFAULT_VARIABLE_NAMES.CART_ITEMS, newCart);
};

export const setIsCartOpen = (bool) => {
  return createAction(DEFAULT_VARIABLE_NAMES.IS_CART_OPEN, bool);
};

// export const setIsCartOpen = (bool) => {
//   return {
//     type: DEFAULT_VARIABLE_NAMES.IS_CART_OPEN,
//     payload: bool,
//   };
// };
