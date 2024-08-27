import "./checkout.styles.scss";
import { useSelector } from "react-redux";
import {
  cartSelectorReducer,
  selectCartTotal,
} from "../../store/cart/cart.selector";
//import Button from "../../components/button/button.styles";
import PaymentForm from "../../components/payment-folder/payment-components.component";
import CheckOutComponent from "../../components/check-out/check-out.component";

const Checkout = () => {
  const cartItems = useSelector(cartSelectorReducer);
  const totalBalance = useSelector(selectCartTotal);

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

      <PaymentForm />
    </div>
  );
};

export default Checkout;
