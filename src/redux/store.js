import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { BASE_API } from "../services/base-api";
import authSlice from "./reducers/authSlice";
import { BASE_API_NODE } from "../services/providerContactPro";

const rootReducer = combineReducers({
  [BASE_API.reducerPath]: BASE_API.reducer,
  [BASE_API_NODE.reducerPath]: BASE_API_NODE.reducer,
  auth: authSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
      .concat(BASE_API.middleware)
      .concat(BASE_API_NODE.middleware),
  });
};

export const store = createStore();
export const persistor = persistStore(store);
