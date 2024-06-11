import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import collectionSlice from "./slices/collectionSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import cartReducer from './slices/CartSlice';

const rootReducer = combineReducers({
  categories: categorySlice,
  products: productSlice,
  collections: collectionSlice,
  cart: cartReducer,
  
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch;