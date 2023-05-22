import { createContext, useState, Provider } from "react";

export const CartContext = createContext({
  isVisible: false,
  setIsVisible: () => {},
});

export const CartProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const value = {isVisible, setIsVisible}
  console.log(CartContext);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};
