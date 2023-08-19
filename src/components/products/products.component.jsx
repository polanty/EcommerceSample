import "./products.style.scss";
import Button from "../button/button.styles";
import { useContext } from "react";
import { CardToggle } from "../../contexts/cardToggle.context";

const CardProductComponent = ({ products }) => {
  const { name, price, imageUrl } = products;
  const { addToCartItem } = useContext(CardToggle);

  const handleAddToCart = (event) => {
    return addToCartItem(products);
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
