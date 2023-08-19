import { createContext, useState, useEffect } from "react";
//import SHOP_DATA from "../shop-data.js";
import { getCollectionFromCloud } from "../utils/firebase/firebase.utils.js";

export const categoriesContext = createContext({
  categories: {},
  //setProducts: () => null,
});

export const CategoriesContextProvider = ({ children }) => {
  const [categories, setCartegories] = useState({});
  const value = { categories };

  // addToCollectionAndDocument("categories", SHOP_DATA);

  useEffect(() => {
    const getCollections = async () => {
      const categoryMap = await getCollectionFromCloud();
      //console.log(categoryMap);
      setCartegories(categoryMap);
    };

    return getCollections;
  }, []);

  return (
    <categoriesContext.Provider value={value}>
      {children}
    </categoriesContext.Provider>
  );
};
