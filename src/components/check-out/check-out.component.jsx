import "./check-out.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { cartSelectorReducer } from "../../store/cart/cart.selector";
import {
  removeItemFromCart,
  removeSingleItemFromCart,
  addItemsToCart,
} from "../../store/cart/cart.action";

import paymentForm from "../payment-folder/payment-components.component";

const CheckOutComponent = ({ item }) => {
  const cartItem = useSelector(cartSelectorReducer);
  console.log(cartItem);
  const dispatch = useDispatch();

  const { name, imageUrl, price, quantity } = item;
  const clearItemHandler = () => dispatch(removeItemFromCart(cartItem, item));
  const addItemstoCart = () => dispatch(addItemsToCart(cartItem, item));
  const removeItemsFromCart = () =>
    dispatch(removeSingleItemFromCart(cartItem, item));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="price">{price}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemsFromCart}>
          &#10094;
        </div>
        {quantity}
        <div className="arrow" onClick={addItemstoCart}>
          &#10095;
        </div>
      </span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>

      <paymentForm />
    </div>
  );
};

export default CheckOutComponent;
