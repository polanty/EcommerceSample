import { configureStore, combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage"; // default: localStorage if web, AsyncStorage if react-native
// import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import { userReducer } from "./user/userReducer";
import { categoryReducer } from "./categories/category-reducer";
import { CartReducer } from "./cart/cart.reducer";

import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./redux-saga/redux-saga";

const rootReducer = combineReducers({
  users: userReducer,
  categories: categoryReducer,
  cart: CartReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["categories", "users"],
};

const PersistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: PersistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      },
      // immutableCheck: false,
    }).concat(
      sagaMiddleware,
      [process.env.NODE_ENV === "development" && logger].filter(Boolean)
    ),
});

sagaMiddleware.run(rootSaga);

export default store;

// Persistor
// export const persistor = persistStore(store);
