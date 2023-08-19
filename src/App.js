import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/hompage.component";
import Navigation from "./routes/navigation/navigation.componenets";
import Shop from "./routes/shop/shop.routes";
import Auth from "./routes/authentication/authentication.components";
import Checkout from "./routes/checkout/checkout.route";

const App = () => {
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
