import "./products.style.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "../button/button.styles";
import { cartSelectorReducer } from "../../store/cart/cart.selector";
import { addItemsToCart } from "../../store/cart/cart.action";

const CardProductComponent = ({ products }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = products;
  const cartItems = useSelector(cartSelectorReducer);

  const handleAddToCart = (event) => {
    return dispatch(addItemsToCart(cartItems, products));
  };
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default CardProductComponent;
