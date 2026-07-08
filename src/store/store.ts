import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import onboardReducer from "./slices/onboardSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    onboard: onboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
