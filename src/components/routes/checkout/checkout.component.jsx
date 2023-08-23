import { useContext } from "react";
import { CartContext } from "../../../contex/cart.context";
import CheckoutCard from "../../checkout-card/checkout-card.component";
import "./checkout.styles.scss";
import Button from "../../button/button.component";
import { BUTTON_TYPE_CLASSES } from "../../button/button.component";
const Checkout = () => {
  const { cartItems, total, cartCount } = useContext(CartContext);
  const checkout_handler = () => {
    fetch('https://crest-clothing.netlify.app/.netlify/functions/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: [
            ...cartItems
          ]
        })
    }).then(res => {
      if(res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    }).then(({url}) => {
      window.location = url
    }).catch(err =>
      console.log(err))
  }
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
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} title="Checkout" onClick={checkout_handler}></Button>
    </div>
  );
};

export default Checkout;
