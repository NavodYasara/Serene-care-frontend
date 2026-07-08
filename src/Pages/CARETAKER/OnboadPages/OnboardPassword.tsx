import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { RootState } from "../../../store/store";
import { resetOnboardData } from "../../../store/slices/onboardSlice";
import { useAuth } from "../../../context/AuthContext";

const OnboardPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth() || {};

  const onboardData = useSelector((state: RootState) => state.onboard);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validations
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // 1. Register the caretaker account credentials
      const registerRes = await axios.post(
        "http://localhost:5000/api/user/registerCaretaker",
        {
          firstName: "",
          lastName: "",
          email: onboardData.email,
          password: password,
          USER_TYPE: "caretaker"
        },
      );

      const userId = registerRes.data.userId;

      // 2. Split fullName to firstName and lastName
      const nameParts = onboardData.fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // 3. Save Caretaker Profile details
      await axios.put("http://localhost:5000/api/user/updateCaretakerProfile", {
        userId,
        firstName,
        lastName,
        email: onboardData.email,
        nationalId: onboardData.nationalId,
        mobileNo: onboardData.contactNo,
        dob: onboardData.dateOfBirth,
        address: onboardData.address,
        mediCon: "",
        emergCont: onboardData.emergencyContact,
      });

      // 4. Save Service request requirements
      // Format recurrence if needed, or simply pass the details
      const reqText = `${onboardData.selectedCategory} - Details: ${onboardData.requirementDetails}`;
      await axios.post("http://localhost:5000/api/requirement/insertRequest", {
        userId,
        startDate: onboardData.startDate,
        endDate: onboardData.endDate || null,
        requirement: reqText,
        preffGender: "Any",
      });

      // 5. Automatically log the user in
      const loginResponse = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email: onboardData.email,
          password: password,
        },
      );

      if (loginResponse.status === 200 && login) {
        const { userType, userProfile, token } = loginResponse.data;
        login(userProfile, userType, token);
      }

      // 6. Reset Redux onboarding store data and navigate to Dashboard
      dispatch(resetOnboardData());
      alert("Registration completed successfully!");
      navigate("/CaretakerDashboard");
    } catch (err: any) {
      console.error("Onboarding submission failed:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please check inputs and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 md:p-12 flex flex-col justify-between h-full min-h-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between h-full"
      >
        <div>
          {/* Header Row: Title & Navigation Buttons */}
          <div className="flex justify-between items-center mb-6 pb-2 border-b border-neutral-100">
            <div>
              <h2 className="font-['Red_Hat_Display'] font-bold text-2xl md:text-3xl text-[#1D1D1D] tracking-tight mb-1">
                Create a password
              </h2>
              <p className="text-sm font-semibold text-neutral-400 font-['Red_Hat_Display']">
                Secure your account to finish registration
              </p>
            </div>

            {/* Navigation Buttons (Back Only) */}
            <div className="flex gap-3 shrink-0">
              {/* Circular Back Button */}
              <button
                type="button"
                onClick={() => navigate("/onboard-step3")}
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
            </div>
          </div>

          {/* Form input fields */}
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-x-6 gap-y-4 max-w-[620px] mx-auto items-center">
            {/* Password */}
            <label
              htmlFor="password"
              className="text-base font-medium text-neutral-800 font-['Red_Hat_Display']"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 bg-white border border-neutral-300 rounded-full px-5 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              required
            />

            {/* Confirm Password */}
            <label
              htmlFor="confirmPassword"
              className="text-base font-medium text-neutral-800 font-['Red_Hat_Display']"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 bg-white border border-neutral-300 rounded-full px-5 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-[620px] mx-auto mt-4 text-red-500 text-sm font-semibold font-['Red_Hat_Display'] text-center">
              {error}
            </div>
          )}

          {/* Submit Button Row */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-[320px] h-12 rounded-full bg-[#1D1D1D] hover:bg-neutral-800 text-white font-['Red_Hat_Display'] font-bold text-base transition-all active:scale-95 shadow-md flex items-center justify-center disabled:bg-neutral-400 cursor-pointer"
            >
              {loading ? "Registering account..." : "Complete Registration"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OnboardPassword;
