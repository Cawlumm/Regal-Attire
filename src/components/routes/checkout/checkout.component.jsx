import { useContext } from "react";
import { CartContext } from "../../../contex/cart.context";
import CheckoutCard from "../../checkout-card/checkout-card.component";
import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, total, cartCount } = useContext(CartContext);
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
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item) => (
        <CheckoutCard key={item.id} item={item} />
      ))}
        <span className="total">Items: {cartCount}</span>
        <span className="total">Total: ${total}</span>
    </div>
  );
};

export default Checkout;
