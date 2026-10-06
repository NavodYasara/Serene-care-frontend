import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CaretakerProfile } from "../../types/CaretakerProfile";

interface ProfileState {
  profileData: CaretakerProfile;
}

const initialState: ProfileState = {
  profileData: {
    id: 0,
    userType: "",
    password: "",
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
    updateProfile: (state, action: PayloadAction<Partial<CaretakerProfile>>) => {
      state.profileData = {
        ...state.profileData,
        ...action.payload,
      };
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
