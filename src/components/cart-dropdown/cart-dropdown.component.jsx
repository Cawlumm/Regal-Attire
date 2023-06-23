import { useContext } from "react";
import { CartContext } from "../../contex/cart.context";
import { Link } from "react-router-dom";
import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";
import { CartDropDownContainer, EmptyMessage, CartItemContainer } from "./cart-dropdown.styles";

const CartDropdown = () => {
const {isVisible, setIsVisible, cartItems} = useContext(CartContext);
const toggleIsVisible = () => setIsVisible(!isVisible);
  return (
    <CartDropDownContainer>
      <CartItemContainer>
        {
          cartItems.length ? cartItems.map((item) => (<CartItem key={item.id} cartItem={item} />)) :
          <EmptyMessage>Your cart is empty</EmptyMessage>
        }
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </CartItemContainer>
      <Link to="/checkout">
        <Button title="Go Checkout" onClick={toggleIsVisible}></Button>
      </Link>
    </CartDropDownContainer>
  );
};

export default CartDropdown;
