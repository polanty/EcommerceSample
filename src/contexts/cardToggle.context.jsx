import { createContext, useState, useEffect } from "react";

const addToCart = (cartItems, productToAdd) => {
  //find if cartItems contains productsToAdd
  const findExistingItem = cartItems.find((cartItem) => {
    return productToAdd.id === cartItem.id;
  });

  if (findExistingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeFromCart = (cartItems, productToRemove) => {
  const findExistingItem = cartItems.find((cartItem) => {
    return productToRemove.id === cartItem.id;
  });

  if (findExistingItem && findExistingItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const initialValue = 0;
// Pass a function to map
const myCartTotal = (array) => {
  return array
    .map((x) => x.quantity)
    .reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
};
const removeItem = (cartItems, productToRemove) => {
  const findExistingItem = cartItems.find((cartItem) => {
    return productToRemove.id === cartItem.id;
  });

  if (findExistingItem) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
};

const TotalBalance = (cartItems) => {
  return cartItems
    .map((cartitem) => cartitem.quantity * cartitem.price)
    .reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
};

export const CardToggle = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addToCartItem: () => {},
  removefromCartItem: () => {},
  iniCartCount: 0,
  removeFromCartList: () => {},
  totalBalance: 0,
});

export const CardToggleProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItem] = useState([]);

  const [iniCartCount, setCartCount] = useState(0);

  const [totalBalance, setTotalBalance] = useState(0);

  const addToCartItem = (productToAdd) => {
    setCartItem(addToCart(cartItems, productToAdd));
  };

  const removefromCartItem = (productToAdd) => {
    setCartItem(removeFromCart(cartItems, productToAdd));
  };

  const removeFromCartList = (productToRemove) => {
    setCartItem(removeItem(cartItems, productToRemove));
  };

  useEffect(() => {
    const countCart = myCartTotal(cartItems);
    return setCartCount(countCart);
  }, [cartItems]);

  useEffect(() => {
    const totalBalance = TotalBalance(cartItems);
    return setTotalBalance(totalBalance);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addToCartItem,
    removefromCartItem,
    cartItems,
    iniCartCount,
    removeFromCartList,
    totalBalance,
  };

  return <CardToggle.Provider value={value}>{children}</CardToggle.Provider>;
};
