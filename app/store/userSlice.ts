// store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string | null;
  email: string | null;
  image: string | null;
}

const initialState: UserState = {
  name: null,
  email: null,
  image: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        name: string | null;
        email: string | null;
        image: string | null;
      }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
    },
    clearUser: (state) => {
      state.name = null;
      state.email = null;
      state.image = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
