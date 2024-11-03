import { configureStore, combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage"; // default: localStorage if web, AsyncStorage if react-native
// import { combineReducers } from "redux";
import { persistReducer, PersistConfig } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { userReducer } from "./user/userReducer";
import { categoryReducer } from "./categories/category-reducer";
import { CartReducer } from "./cart/cart.reducer";

import { rootSaga } from "./redux-saga/redux-saga";

const rootReducer = combineReducers({
  users: userReducer,
  categories: categoryReducer,
  cart: CartReducer,
});

export type Rootstate = ReturnType<typeof rootReducer>;

export type extendedpersistConfig = PersistConfig<Rootstate> & {
  blacklist: (keyof Rootstate)[];
};

const persistConfig: extendedpersistConfig = {
  key: "root",
  storage,
  blacklist: ["categories", "users"],
};

const PersistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

// Create an array to hold all middlewares, and conditionally include logger
const middlewares = [
  sagaMiddleware,
  process.env.NODE_ENV === "development" ? logger : undefined, // Conditionally include `logger`
].filter((middleware): middleware is typeof sagaMiddleware =>
  Boolean(middleware)
); // Type-safe filtering

const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: PersistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore Redux Persist actions that don't pass serializability checks
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      },
    }).concat(...middlewares),

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [
  //         "persist/PERSIST",
  //         "persist/REHYDRATE",
  //         "persist/PAUSE",
  //         "persist/PURGE",
  //         "persist/FLUSH",
  //         "persist/REGISTER",
  //       ],
  //     },
  //     // immutableCheck: false,
  //   }).concat(
  //     sagaMiddleware,
  //     [process.env.NODE_ENV === "development" && logger].filter(Boolean)
  //   ),
});

sagaMiddleware.run(rootSaga);

// TypeScript type for store dispatch, useful in components for useDispatch<AppDispatch>()
export type AppDispatch = typeof store.dispatch;

export default store;

// Persistor
// export const persistor = persistStore(store);
