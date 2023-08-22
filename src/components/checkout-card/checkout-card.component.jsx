import "./checkout-card.styles.scss";
import { CartContext } from "../../contex/cart.context";
import { useContext } from "react";
import Button from "../button/button.component";
const CheckoutCard = ({ item }) => {
  const { imageUrl, id, name, price, quantity } = item;
  const { addItemToCart, removeItemFromCart, clearItemFromCart, cartCount } =
    useContext(CartContext);
  const handleIncrement = (item) => {
    addItemToCart(item);
  };
  const handleDecrement = (item) => {
    removeItemFromCart(item);
  };
  const handleRemove = () => clearItemFromCart(item);
  return (
    <div className="checkout-card-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div onClick={() => handleDecrement(item)} className="arrow">&#10094;</div>
        <span className="value">{quantity}</span>
        <div onClick={() => handleIncrement(item)} className="arrow">&#10095;</div>
      </span>
      <span className="price">${quantity * price}</span>
      <div onClick={handleRemove} className="remove-button">
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutCard;
