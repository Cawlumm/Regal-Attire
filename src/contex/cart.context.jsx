import { createContext, useState, useEffect, useCallback, useContext } from "react";
import {  updateUserCart } from "../utils/firebase/firebase.utils";
import { UserContext } from "./user.context";

// Function to update the quantity of a product in the cart
const addCartItem = (cartItems, productToAdd) => {
  // Existing Item in Cart
  const existingItem = cartItems.find((item) => item.id === productToAdd.id);

  if (existingItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// Function to update the quantity of a product in the cart
const removeCartItem = (cartItems, productToRemove) => {
  const itemToRemove = cartItems.find((item) => item.id === productToRemove.id);
  if (itemToRemove.quantity === 1) {
    return cartItems.filter((cartItems) => cartItems.id !== itemToRemove.id);
  } else {
    return cartItems.map((item) =>
      item.id === productToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
};

// Function to update the quantity of a product in the cart
const clearCartItem = (cartItems, productToClear) => cartItems.filter((item) => item.id !== productToClear.id);

// Create the CartContext with default values
export const CartContext = createContext({
  isVisible: false, // Default value for visibility
  setIsVisible: () => {}, // Default empty function for updating visibility
  cartItems: [], // Default empty array for cart items
  setCartItems: () => {},
  addItemToCart: () => {}, // Default empty function for adding item to cart
  removeItemFromCart: () => {}, // Default empty function for removing item from cart
  clearItemFromCart: () => {},
  cartCount: 0,
  setCartCount: () => {},
  total: 0,
});

// CartProvider component as the context provider
export const CartProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false); // State for visibility
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [cartCount, setCartCount] = useState(0); // State for cart count
  const [total, setTotal] = useState(0);

  const {currentUser} = useContext(UserContext)

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (total, cartItem) => total + (cartItem.quantity * cartItem.price),
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  useEffect(() => {
    // Define an asynchronous function to update the user's cart
    const updateUserCartAsync = async () => {
      // Check if a user is logged in
      if (currentUser) {
        // Update the user's cart using the updateUserCart function
        await updateUserCart(currentUser.uid, cartItems);
      }
    };
  
    // Call the update function when cartItems change
    updateUserCartAsync();
  }, [cartItems]); // Listen for changes to cartItems

  // Function to add an item to the cart
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = async (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  }

  // Value object to be provided as the context value
  const value = {
    isVisible, // Current visibility state
    setIsVisible, // Function to update visibility
    cartItems, // Current cart items
    setCartItems,
    addItemToCart,
    removeItemFromCart, // Function to add item to cart
    clearItemFromCart,
    cartCount,
    setCartCount,
    total,
  };

  return (
    // Provide the value to the CartContext for its children
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};
