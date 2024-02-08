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

  const addToCart = (productToAdd) => {
    const existingProductIndex = cartItems.findIndex(
      (product) => product.props.productId === productToAdd.props.productId
    );
  
    if (existingProductIndex !== -1) {
      const updatedCart = cartItems.map((product, index) => {
        if (index === existingProductIndex) {
          return {
            ...product,
            props: {
              productId : product.props.productId,
              nom: product.props.nom,
              reference: product.props.reference,
              businessName: product.props.businessName,
              quantity: product.props.quantity + productToAdd.props.quantity,
              price: product.props.price
            }
          };
        }
        return product;
      });
      setCartItems(updatedCart);
      updateCartInSessionStorage(updatedCart);
    } else {
      const updatedCart = [...cartItems, productToAdd];
      setCartItems(updatedCart);
      updateCartInSessionStorage(updatedCart);
    }
    
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
