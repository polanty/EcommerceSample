import { createSelector } from "reselect";
import { TotalBalance, myCartTotal } from "../../contexts/cardToggle.context";
import { CartState } from "./cart.reducer";
import { Rootstate } from "../store";

//the default value of the cartItem
const cartSelector = (state: Rootstate): CartState => state.cart;

export const cartSelectorReducer = createSelector(
  [cartSelector],
  (cart) => cart.cartItems
);

export const cartToggleSelector = createSelector(
  [cartSelector],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([cartSelectorReducer], (cart) =>
  myCartTotal(cart)
);
export const selectCartTotal = createSelector([cartSelectorReducer], (cart) =>
  TotalBalance(cart)
);
