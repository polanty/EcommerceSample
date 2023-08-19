import "./cart-items.styles.scss";

const CartItems = ({ items }) => {
  const { name, quantity, imageUrl, price } = items;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} * ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItems;
