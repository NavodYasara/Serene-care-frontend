import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { updateOnboardData } from "../../../store/slices/onboardSlice";

const OnboardRequirement: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Read state from Redux store with a defensive fallback
  const requirementDetails = useSelector(
    (state: RootState) => state.onboard?.requirementDetails || "",
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateOnboardData({ requirementDetails: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requirementDetails.trim()) {
      alert("Please tell us about your requirement before proceeding.");
      return;
    }
    navigate("/onboard-step4");
  };

  return (
    <div className="p-8 md:p-12 flex flex-col h-full min-h-full justify-between">
      <form
        id="requirement-form"
        onSubmit={handleSubmit}
        className="flex flex-col h-full justify-between"
      >
        <div className="flex flex-col h-full">
          {/* Header Row: Title & Navigation Buttons */}
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-neutral-100">
            <div>
              <h2 className="font-['Red_Hat_Display'] font-medium text-2xl md:text-3xl text-[#1D1D1D] tracking-tight">
                Tell us what is your requirment?
              </h2>
              <p className="text-sm font-semibold text-neutral-400 font-['Red_Hat_Display'] mt-1">
                Briefly tell what do you want to be from us ?
              </p>
            </div>

            {/* Navigation Buttons (Back & Next) */}
            <div className="flex gap-3 shrink-0">
              {/* Circular Back Button */}
              <button
                type="button"
                onClick={() => navigate("/onboard-step2")}
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

          {/* Sleek Text Area for input */}
          <div className="flex-1 mt-6">
            <textarea
              id="requirementDetails"
              name="requirementDetails"
              value={requirementDetails}
              onChange={handleTextChange}
              placeholder="Type your requirements here..."
              className="w-full h-full min-h-[250px] bg-transparent border-0 font-['Red_Hat_Display'] text-base text-neutral-800 placeholder-neutral-300 focus:outline-none focus:ring-0 resize-none"
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default OnboardRequirement;
