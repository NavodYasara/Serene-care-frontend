import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OnboardState {
  // Step 1: Personal Information
  fullName: string;
  nationalId: string;
  dateOfBirth: string;
  email: string;
  address: string;
  contactNo: string;
  emergencyContact: string;

  // Step 2: Service Category
  selectedCategory: string;
  startDate: string;
  endDate: string;
  repeatOption: string;
  repeatEvery: number;
  selectedDays: string[];
  startTime: string;
  durationHours: number;
  requirementDetails: string;
  password: string;
}

const initialState: OnboardState = {
  fullName: "",
  nationalId: "",
  dateOfBirth: "",
  email: "",
  address: "",
  contactNo: "",
  emergencyContact: "",

  selectedCategory: "Personal Care",
  startDate: "",
  endDate: "",
  repeatOption: "Weekly",
  repeatEvery: 1,
  selectedDays: ["W"],
  startTime: "",
  durationHours: 1,
  requirementDetails: "",
  password: "",
};

const onboardSlice = createSlice({
  name: "onboard",
  initialState,
  reducers: {
    updateOnboardData: (state, action: PayloadAction<Partial<OnboardState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetOnboardData: () => initialState,
  },
});

export const { updateOnboardData, resetOnboardData } = onboardSlice.actions;
export default onboardSlice.reducer;
