import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { counterReducer } from "./src/counterSlice";
import  usersReducer from "./src/userSlice"

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  counter: counterReducer,
  users: usersReducer,
});

const persistConfig = {
  key: "root",
  storage:storage.default||storage,
}; 
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);