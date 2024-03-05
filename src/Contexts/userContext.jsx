import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  profileImage: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
    getUser: (state) => {
      return state;
    },
  },
});

export const { setUser, getUser } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
