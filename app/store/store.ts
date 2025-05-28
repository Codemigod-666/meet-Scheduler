// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import meetingReducer from "./meetingSlice";
import userReducer from "./userSlice";
import storageSession from "./storage";

// Step 1: Combine reducers
const rootReducer = combineReducers({
  meeting: meetingReducer,
  user: userReducer,
});

// Step 2: Configure persist
const persistConfig = {
  key: "root",
  storage: storageSession, // Use sessionStorage instead of localStorage
};

// Step 3: Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 4: Create store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required by redux-persist
    }),
});

// Step 5: Create persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
