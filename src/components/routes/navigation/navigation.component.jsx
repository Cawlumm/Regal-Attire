import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg";
import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../../contex/user.context";
import { CartContext } from "../../../contex/cart.context";
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import { useEffect, useState } from "react";
import { loadUserCart } from "../../../utils/firebase/firebase.utils";
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from "./navigation.styles";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const {setCartItems} =  useContext(CartContext)
  const { isVisible, setIsVisible} = useContext(CartContext);
  const [cartLoaded, setCartLoaded] = useState(false); // Add local state

  const signOutHandler = async () => {
    await signOutUser();
  };

  // Use effect to fire once when the component mounts
  // With the use of usestate, loads when the cart has not been loaded
  useEffect(() => {
    const loadUserCartAsync = async () => {
      if(currentUser && !cartLoaded) { // if user exists and cart has not been previously loaded
        const userCart = await loadUserCart(currentUser.uid)
        setCartItems(userCart)
        setCartLoaded(true);
      }
    }
    loadUserCartAsync();
  });

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <NavLink as='span' onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isVisible && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
