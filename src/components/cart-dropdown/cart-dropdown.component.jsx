import {
  CartDropDownContainer,
  CartItemMessage,
  CartMessageMessage,
  CartMessageContainer,
} from "./cart-dropdown.style.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.styles";
import { useSelector } from "react-redux";
import { cartSelectorReducer } from "../../store/cart/cart.selector";
import CartItems from "../cart-items/cart-items.components";
import { useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom";
//import { NavLink } from "react-router-dom";

const CartDropDown = () => {
  const cartItems = useSelector(cartSelectorReducer);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("Checkout");
  };

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
      {/* <NavLink to="Checkout"> */}
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        style={{ marginTop: 10 }}
        onClick={handleClick}
      >
        GO TO CHECKOUT
      </Button>
      {/* </NavLink> */}
    </CartDropDownContainer>
  );
};

export default CartDropDown;
