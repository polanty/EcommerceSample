import { CartItem } from "./cart.reducer";
import {
  createAction,
  withMatcher,
  actionWithPayload,
} from "../genericActionCreator";
import {
  addToCart,
  removeItem,
  removeSingleCartItem,
} from "../../contexts/cardToggle.context";
import { CategoryItem } from "../categories/category-reducer";

export enum DEFAULT_VARIABLE_NAMES {
  CART_ITEMS = "CART_ITEMS",
  IS_CART_OPEN = "IS_CART_OPEN",
}

export type SetIsCartOpen = actionWithPayload<
  DEFAULT_VARIABLE_NAMES.IS_CART_OPEN,
  boolean
>;
export type SetCartItems = actionWithPayload<
  DEFAULT_VARIABLE_NAMES.CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen =>
    createAction(DEFAULT_VARIABLE_NAMES.IS_CART_OPEN, bool)
);

//default withmatcher function to set cart items
export const setCartItems = withMatcher(
  (cartitems: CartItem[]): SetCartItems =>
    createAction(DEFAULT_VARIABLE_NAMES.CART_ITEMS, cartitems)
);

export const addItemsToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCart = addToCart(cartItems, productToAdd);

  return setCartItems(newCart);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
) => {
  const newCart = removeItem(cartItems, cartItemToRemove);

  return setCartItems(newCart);
};

export const removeSingleItemFromCart = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
) => {
  const newCart = removeSingleCartItem(cartItems, cartItemToClear);

  return setCartItems(newCart);
};

// export const setIsCartOpen = (bool) => {
//   return {
//     type: DEFAULT_VARIABLE_NAMES.IS_CART_OPEN,
//     payload: bool,
//   };
// };
