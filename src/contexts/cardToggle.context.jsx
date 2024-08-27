import { createContext, useEffect, useReducer } from "react";

export const addToCart = (cartItems, productToAdd) => {
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

export const removeSingleCartItem = (cartItems, productToRemove) => {
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
export const myCartTotal = (array) => {
  return array
    .map((x) => x.quantity)
    .reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
};

export const removeItem = (cartItems, productToRemove) => {
  const findExistingItem = cartItems.find((cartItem) => {
    return productToRemove.id === cartItem.id;
  });

  if (findExistingItem) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
};

export const TotalBalance = (cartItems) => {
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
  removeSingleCartItem: () => {},
  iniCartCount: 0,
  removeFromCartList: () => {},
  totalBalance: 0,
});

//first attemot of creating a reducer version of the cart item controller
const cartValueHolder = {
  IS_CART_OPEN: "IS_CART_OPEN",
  ADD_TO_CART_ITEM: "ADD_TO_CART_ITEM",
  REMOVE_FROM_CART_ITEM: "REMOVE_FROM_CART_ITEM",
  TOTAL_CART_COUNT: "INITIAL_CART_COUNT",
  TOTAL_BALANCE: "TOTAL_BALANCE",
  REMOVE_SINGLE_ITEM: "REMOVE_SINGLE_ITEM",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case cartValueHolder.IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case cartValueHolder.ADD_TO_CART_ITEM:
      return {
        ...state,
        cartItems: payload,
      };
    case cartValueHolder.REMOVE_FROM_CART_ITEM:
      return {
        ...state,
        cartItems: payload,
      };
    case cartValueHolder.TOTAL_BALANCE:
      return {
        ...state,
        totalBalance: payload,
      };
    case cartValueHolder.TOTAL_CART_COUNT:
      return {
        ...state,
        iniCartCount: payload,
      };
    case cartValueHolder.REMOVE_SINGLE_ITEM:
      return {
        ...state,
        cartItems: payload,
      };

    default:
      throw new Error(`There is no value for this Reducer ${type}`);
  }
};

//initial state of all the values passed in to be handled by the reducer within the exporting context
const INITIAL_CART_REDUCERSTATE = {
  isCartOpen: false,
  cartItems: [],
  totalBalance: 0,
  iniCartCount: 0,
};

export const CardToggleProvider = ({ children }) => {
  //first reducer createed for cart toogle
  const [state, dispatch] = useReducer(cartReducer, INITIAL_CART_REDUCERSTATE);
  const { isCartOpen, cartItems, totalBalance, iniCartCount } = state;

  //cart toogle reducer, payload delivers the toggle with the NOT operator
  const setIsCartOpen = () => {
    dispatch({ type: cartValueHolder.IS_CART_OPEN, payload: !isCartOpen }); // i replaced the usestate value of what i have below with this reducer 😊
  }; // const [isCartOpen, setIsCartOpen] = useState(false);

  //the payload delivers the already defined add to cart funtionality
  //all that was needed was to pass an argument into the funtion that reperesents the products to be added
  //this function is then exported out within the value of the context
  //replaces setstate method commented out below
  // const addToCartItem = (productToAdd) => {
  //   setCartItem(addToCart(cartItems, productToAdd));
  // };
  const addToCartItem = (productToAdd) => {
    dispatch({
      type: cartValueHolder.ADD_TO_CART_ITEM,
      payload: addToCart(cartItems, productToAdd),
    });
  }; // const [cartItems, setCartItem] = useState([]);

  //removeFromCart reducer
  const removeFromCartList = (productToRemove) => {
    dispatch({
      type: cartValueHolder.REMOVE_FROM_CART_ITEM,
      payload: removeItem(cartItems, productToRemove),
    });
  }; // const removeFromCartList = (productToRemove) => {
  //   setCartItem(removeItem(cartItems, productToRemove)); //useState equivalent
  // };

  // const [iniCartCount, setCartCount] = useState(0);

  // const [totalBalance, setTotalBalance] = useState(0);

  const removefromCartItem = (singleProductToRemove) => {
    dispatch({
      type: cartValueHolder.REMOVE_SINGLE_ITEM,
      payload: removeSingleCartItem(cartItems, singleProductToRemove),
    });
  };

  // const removefromCartItem = (productToAdd) => {
  //   setCartItem(removeFromCart(cartItems, productToAdd));
  // };//usestate equvalent

  useEffect(() => {
    const countCart = myCartTotal(cartItems);
    // return setCartCount(countCart);
    dispatch({ type: cartValueHolder.TOTAL_CART_COUNT, payload: countCart });
  }, [cartItems]);

  useEffect(() => {
    const totalBalance = TotalBalance(cartItems);
    // return setTotalBalance(totalBalance);
    dispatch({ type: cartValueHolder.TOTAL_BALANCE, payload: totalBalance });
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addToCartItem,
    cartItems,
    iniCartCount,
    totalBalance,

    removeFromCartList,
    removefromCartItem,
  };

  return <CardToggle.Provider value={value}>{children}</CardToggle.Provider>;
};
