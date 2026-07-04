import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  profileData: {
    firstName: string;
    lastName: string;
    nationalId: string;
    dob: string;
    mobileNo: string;
    emergCont: string;
    category: string;
    userId: string;
    mediCon: string;
    email: string;
    address: string;
  };
}

const initialState: ProfileState = {
  profileData: {
    firstName: "",
    lastName: "",
    nationalId: "",
    dob: "",
    mobileNo: "",
    emergCont: "",
    category: "",
    userId: "",
    mediCon: "",
    email: "",
    address: "",
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<any>) => {
      state.profileData = {
        ...state.profileData,
        ...action.payload,
      };
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
