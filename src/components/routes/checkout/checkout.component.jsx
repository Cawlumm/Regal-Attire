import { useContext } from "react";
import { CartContext } from "../../../contex/cart.context";
import CheckoutCard from "../../checkout-card/checkout-card.component";
import "./checkout.styles.scss";
import Button from "../../button/button.component";
import { BUTTON_TYPE_CLASSES } from "../../button/button.component";
const Checkout = () => {
// Import the necessary functions from the React Context
const { cartItems, total, cartCount } = useContext(CartContext);

// Define a handler function for initiating the checkout process
const checkout_handler = () => {
  // Send a POST request to the serverless function URL
  fetch('https://crest-clothing.netlify.app/.netlify/functions/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the request content type
    },
    body: JSON.stringify({
      items: [...cartItems], // Pass the cart items as JSON data in the request body
    }),
  })
    .then(res => {
      // Check if the response is OK
      if (res.ok) return res.json();
      // If not OK, reject the response and handle the error
      return res.json().then(json => Promise.reject(json));
    })
    .then(({ url }) => {
      // If the response is successful, redirect the user to the checkout URL
      window.location = url;
    })
    .catch(err => {
      // Handle any errors that occur during the process
      console.log(err);
    });
};
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
