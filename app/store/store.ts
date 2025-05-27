// import { configureStore } from "@reduxjs/toolkit";
// import meetingReducer from "./meetingSlice";
// import userReducer from "./userSlice";

// export const store = configureStore({
//   reducer: {
//     meeting: meetingReducer,
//     user: userReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // <-- uses sessionStorage
import meetingReducer from "./meetingSlice";
import userReducer from "./userSlice";

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
