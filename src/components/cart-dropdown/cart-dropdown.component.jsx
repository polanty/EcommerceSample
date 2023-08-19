import {
  CartDropDownContainer,
  CartItemMessage,
  CartMessageMessage,
  CartMessageContainer,
} from "./cart-dropdown.style.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.styles";
import CartItems from "../cart-items/cart-items.components";
import { useContext } from "react";
import { CardToggle } from "../../contexts/cardToggle.context";
import { Link } from "react-router-dom";

const CartDropDown = () => {
  const { cartItems } = useContext(CardToggle);

  return (
    <CartDropDownContainer>
      <CartItemMessage>
        {cartItems.length < 1 ? (
          <CartMessageContainer>
            <CartMessageMessage>Cart is empty</CartMessageMessage>
          </CartMessageContainer>
        ) : (
          cartItems.map((cartItem) => (
            <CartItems key={cartItem.id} items={cartItem} />
          ))
        )}
      </CartItemMessage>
      <Link to="Checkout">
        <Button
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          style={{ marginTop: 10 }}
        >
          GO TO CHECKOUT
        </Button>
      </Link>
    </CartDropDownContainer>
  );
};

export default CartDropDown;
