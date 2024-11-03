import { useDispatch, useSelector } from "react-redux";
import { cartToggleSelector } from "../../store/cart/cart.selector";
import { selectCartCount } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
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
