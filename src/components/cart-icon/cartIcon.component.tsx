import { useDispatch, useSelector } from "react-redux";
import {
  cartToggleSelector,
  selectCartCount,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { CartIconContainer, ItemCount, ShoppingBasket } from "./cartIcon.style";

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
