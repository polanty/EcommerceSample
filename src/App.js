import { Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import Spinner from "./components/spinner/spinner.components";
import { createUserSession } from "./store/userDispatch.action";
import { GlobalStyle } from "./global.styles";

const Home = lazy(() => import("./routes/home/hompage.component"));
const Navigation = lazy(() =>
  import("./routes/navigation/navigation.componenets")
);
const Shop = lazy(() => import("./routes/shop/shop.routes"));
const Auth = lazy(() =>
  import("./routes/authentication/authentication.components")
);
const Checkout = lazy(() => import("./routes/checkout/checkout.route"));

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
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />}></Route>
          <Route path="Shop/*" element={<Shop />}></Route>
          <Route path="SignIn" element={<Auth />}></Route>
          <Route path="Checkout" element={<Checkout />}></Route>
        </Route>
      </Routes>
    </Suspense>
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
