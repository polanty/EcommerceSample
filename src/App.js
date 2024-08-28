import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Home from "./routes/home/hompage.component";
import Navigation from "./routes/navigation/navigation.componenets";
import Shop from "./routes/shop/shop.routes";
import Auth from "./routes/authentication/authentication.components";
import Checkout from "./routes/checkout/checkout.route";
import { createUserSession } from "./store/userDispatch.action";

const App = () => {
  //usedispatch
  const dispatch = useDispatch();

  //dispatch function to set the users after logging in
  useEffect(() => {
    dispatch(createUserSession());
    // getCurrentUser()
    //   .then((user) => console.log(user))
    //   .then((user) => user.data());
  });

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="Shop/*" element={<Shop />}></Route>
        <Route path="SignIn" element={<Auth />}></Route>
        <Route path="Checkout" element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
};

export default App;

//getCurrentUser().then((user) => console.log(user));

// const unsuscribe = onAuthStateChangedListener((user) => {
//   if (user) {
//     createUserDocumentFromPopUp(user);
//   }

//   dispatch(setCurrentUser(user));
// });

// // unsuscribe();
// return unsuscribe;

//dispatch function to get the categories from the cloud
// useEffect(() => {
//   const getCollections = async () => {
//     const categoryMapArray = await getCollectionFromCloud("categories");
//     dispatch(setCategories(categoryMapArray));
//   };

//   getCollections();
// }, []);
// console.log(process.env);
