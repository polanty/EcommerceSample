import "./check-out.styles.scss";
import { useContext } from "react";
import { CardToggle } from "../../contexts/cardToggle.context";

const CheckOutComponent = ({ item }) => {
  const { removeFromCartList, addToCartItem, removefromCartItem } =
    useContext(CardToggle);
  const { name, imageUrl, price, quantity } = item;
  const clearItemHandler = () => removeFromCartList(item);
  const addItemstoCart = () => addToCartItem(item);
  const removeItemsFromCart = () => removefromCartItem(item);

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
    </div>
  );
};

export default CheckOutComponent;
