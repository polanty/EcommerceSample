import { useDispatch, useSelector } from "react-redux";
import { cartToggleSelector } from "../../store/cart/cart.selector.js";
import { selectCartCount } from "../../store/cart/cart.selector.js";
import { setIsCartOpen } from "../../store/cart/cart.action.js";
import {
  CartIconContainer,
  ItemCount,
  ShoppingBasket,
} from "./cartIcon.style.jsx";

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(cartToggleSelector);
  const iniCartCount = useSelector(selectCartCount);

  const handleClick = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={handleClick}>
      <ShoppingBasket />
      <ItemCount className="item-count">{iniCartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
