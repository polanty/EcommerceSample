import {
  CartIconContainer,
  ItemCount,
  ShoppingBasket,
} from "./cartIcon.style.jsx";
import { useContext } from "react";
import { CardToggle } from "../../contexts/cardToggle.context";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, iniCartCount } = useContext(CardToggle);

  const handleClick = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={handleClick}>
      <ShoppingBasket />
      <ItemCount className="item-count">{iniCartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
