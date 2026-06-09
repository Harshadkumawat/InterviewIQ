import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./auth/authSlice"; 

export default configureStore({
  reducer: {
    user: userSlice,
  },
});
