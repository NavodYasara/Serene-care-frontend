import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { updateOnboardData } from "../../../store/slices/onboardSlice";

const OnboardForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Read state from Redux store with a defensive fallback
  const formData = useSelector((state: RootState) => state.onboard) || {
    fullName: "",
    nationalId: "",
    dateOfBirth: "",
    email: "",
    address: "",
    contactNo: "",
    emergencyContact: "",
  };

  // Handler to update values when user types directly into Redux store
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateOnboardData({ [name]: value }));
  };

  // Submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    navigate("/onboard-step2");
  };

  return (
    <div className="p-8 md:p-12 flex flex-col justify-between h-full min-h-full">
      <form
        id="onboard-form"
        onSubmit={handleSubmit}
        className="flex flex-col justify-between h-full"
      >
        <div>
          {/* Header Row: Title & Navigation Buttons */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-['Red_Hat_Display'] font-medium text-3xl md:text-4xl text-[#1D1D1D] tracking-tight">
              Personal Information
            </h2>

            {/* Navigation Buttons (Back & Next) */}
            <div className="flex gap-3">
              {/* Circular Back Button */}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#1D1D1D] hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer shadow-sm"
                aria-label="Back"
              >
                <svg
                  className="w-5 h-5 text-[#1D1D1D]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </button>

              {/* Circular Next Button */}
              <button
                type="submit"
                className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#1D1D1D] bg-[#1D1D1D] hover:bg-neutral-800 text-white active:scale-95 transition-all cursor-pointer shadow-sm"
                aria-label="Next Step"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Form Content: Labels and Inputs in responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-x-6 gap-y-4 max-w-[620px] mx-auto items-center">
            {/* Full Name */}
            <label
              htmlFor="fullName"
              className="text-base font-medium text-neutral-800 font-['Red_Hat_Display']"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full h-11 bg-white border border-neutral-300 rounded-full px-5 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              // required
            />

            {/* National ID */}
            <label
              htmlFor="nationalId"
              className="text-base font-medium text-neutral-800 font-['Red_Hat_Display']"
            >
              National ID
            </label>
            <input
              type="text"
              id="nationalId"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
              placeholder="998323135V"
              className="w-full h-11 bg-white border border-neutral-300 rounded-full px-5 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              required
            />

            {/* Date of Birth */}
            <label
              htmlFor="dateOfBirth"
              className="text-base font-medium text-neutral-800 font-['Red_Hat_Display']"
            >
              Birth of Date
            </label>
            <input
              type="text"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              placeholder="1964 - 10 - 12"
              className="w-full h-11 bg-white border border-neutral-300 rounded-full px-5 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              required
            />

            {/* Email */}
            <label
              htmlFor="email"
              className="text-base font-medium text-neutral-800 font-['Red_Hat_Display']"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@gmail.com"
              className="w-full h-11 bg-white border border-neutral-300 rounded-full px-5 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              required
            />

            {/* Address */}
            <label
              htmlFor="address"
              className="text-base font-medium text-neutral-800 font-['Red_Hat_Display']"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="No 23, 11 Street, Colombo 7"
              className="w-full h-11 bg-white border border-neutral-300 rounded-full px-5 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              required
            />

            {/* Contact Number */}
            <label
              htmlFor="contactNo"
              className="text-base font-medium text-neutral-800 font-['Red_Hat_Display']"
            >
              Contact No.
            </label>
            <input
              type="tel"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              placeholder="0112424321"
              className="w-full h-11 bg-white border border-neutral-300 rounded-full px-5 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              required
            />

            {/* Emergency Contact */}
            <label
              htmlFor="emergencyContact"
              className="text-base font-medium text-neutral-800 font-['Red_Hat_Display']"
            >
              Immergency Cont.
            </label>
            <input
              type="tel"
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="0772424321"
              className="w-full h-11 bg-white border border-neutral-300 rounded-full px-5 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default OnboardForm;
