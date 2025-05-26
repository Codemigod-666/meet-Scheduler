import { configureStore } from "@reduxjs/toolkit";
import meetingReducer from "./meetingSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    meeting: meetingReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
