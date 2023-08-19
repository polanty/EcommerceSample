import "./checkout.styles.scss";
import { useContext } from "react";
import { CardToggle } from "../../contexts/cardToggle.context";
//import Button from "../../components/button/button.styles";
import CheckOutComponent from "../../components/check-out/check-out.component";

const Checkout = () => {
  const { cartItems, totalBalance } = useContext(CardToggle);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Price </span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((cartItem) => {
        return <CheckOutComponent item={cartItem} key={cartItem.id} />;
      })}
      <span className="total">{`Total: ${totalBalance} $`}</span>
    </div>
  );
};

export default Checkout;
