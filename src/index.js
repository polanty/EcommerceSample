import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Userprovider } from "./contexts/user.context";
import { CategoriesContextProvider } from "./contexts/product.context";
import { CardToggleProvider } from "./contexts/cardToggle.context";

import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Userprovider>
        <CategoriesContextProvider>
          <CardToggleProvider>
            <App />
          </CardToggleProvider>
        </CategoriesContextProvider>
      </Userprovider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
