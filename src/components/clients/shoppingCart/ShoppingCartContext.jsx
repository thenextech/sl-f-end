import React, { createContext, useState, useContext } from 'react';

const ShoppingCartContext = createContext();

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    return cart;
  });


  const updateCartInSessionStorage = (cart) => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  const clearCartInSessionStorage = () => {
    sessionStorage.removeItem('cart');
  };

  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    updateCartInSessionStorage(updatedCart);
  };

  const removeItemFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.props.productId !== productId);
    setCartItems(updatedCart);
    updateCartInSessionStorage(updatedCart);
  };

  const clearCart = () => {
    console.log('clicked!');
    setCartItems([]);
    clearCartInSessionStorage();
  }


  return (
    <ShoppingCartContext.Provider value={{ cartItems, addToCart, clearCart, removeItemFromCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
