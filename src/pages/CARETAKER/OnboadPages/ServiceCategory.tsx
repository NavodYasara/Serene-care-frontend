import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { updateOnboardData } from "../../../store/slices/onboardSlice";

// Service category definitions
interface ServiceType {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const ServiceCategory: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Read state from Redux store with a defensive fallback
  const onboardData = useSelector((state: RootState) => state.onboard) || {
    selectedCategory: "Personal Care",
    startDate: "",
    endDate: "",
    repeatOption: "Weekly",
    repeatEvery: 1,
    selectedDays: ["W"],
    startTime: "",
    durationHours: 1,
  };

  const {
    selectedCategory,
    startDate,
    endDate,
    repeatOption,
    repeatEvery,
    selectedDays,
    startTime,
    durationHours,
  } = onboardData;

  const setSelectedCategory = (val: string) => {
    dispatch(updateOnboardData({ selectedCategory: val }));
  };
  const setStartDate = (val: string) => {
    dispatch(updateOnboardData({ startDate: val }));
  };
  const setEndDate = (val: string) => {
    dispatch(updateOnboardData({ endDate: val }));
  };
  const setRepeatOption = (val: string) => {
    dispatch(updateOnboardData({ repeatOption: val }));
  };
  const setRepeatEvery = (val: number) => {
    dispatch(updateOnboardData({ repeatEvery: val }));
  };
  const setStartTime = (val: string) => {
    dispatch(updateOnboardData({ startTime: val }));
  };
  const setDurationHours = (val: number) => {
    dispatch(updateOnboardData({ durationHours: val }));
  };

  const [durationType, setDurationType] = useState("RECURRENCE");

  const serviceCategories: ServiceType[] = [
    {
      id: "personal",
      title: "Personal Care",
      icon: (
        <svg
          className="w-10 h-10 text-[#2E8B57]"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="12"
            y="24"
            width="40"
            height="32"
            rx="4"
            stroke="currentColor"
            strokeWidth="3"
            fill="#E6F4EA"
          />
          <path
            d="M8 26L32 6L56 26"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle
            cx="32"
            cy="38"
            r="8"
            stroke="currentColor"
            strokeWidth="3"
            fill="white"
          />
          <path
            d="M32 34V42M28 38H36"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: "nursing",
      title: "Nursing Support",
      icon: (
        <svg
          className="w-10 h-10 text-[#FF6B6B]"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="32"
            cy="20"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            fill="#FFEAEB"
          />
          <path
            d="M14 50C14 40 22 34 32 34C42 34 50 40 50 50"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M26 14H38M32 10V18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect
            x="24"
            y="44"
            width="16"
            height="12"
            rx="2"
            fill="currentColor"
          />
          <path
            d="M18 36C18 36 24 38 32 38C40 38 46 36 46 36"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: "companionship",
      title: "Companionship",
      icon: (
        <svg
          className="w-10 h-10 text-[#4A90E2]"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="22"
            cy="20"
            r="8"
            stroke="currentColor"
            strokeWidth="3"
            fill="#E6F0FA"
          />
          <circle
            cx="42"
            cy="22"
            r="7"
            stroke="currentColor"
            strokeWidth="3"
            fill="#E6F0FA"
          />
          <path
            d="M8 52C8 42 15 36 22 36C29 36 34 40 35 46"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M34 52C34 44 38 38 44 38C50 38 56 43 56 52"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M26 30C28 32 34 32 36 30"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: "therapy",
      title: "Physical Therapy",
      icon: (
        <svg
          className="w-10 h-10 text-[#9B5DE5]"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="32"
            cy="14"
            r="6"
            stroke="currentColor"
            strokeWidth="3"
            fill="#F3EAFE"
          />
          <path
            d="M20 28H44M32 20V38L24 54M32 38L40 54"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="28" r="3" fill="currentColor" />
          <circle cx="44" cy="28" r="3" fill="currentColor" />
        </svg>
      ),
    },
  ];

  const weekdays = ["S", "M", "Tu", "W", "Th", "F", "S"];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      dispatch(
        updateOnboardData({
          selectedDays: selectedDays.filter((d) => d !== day),
        }),
      );
    } else {
      dispatch(updateOnboardData({ selectedDays: [...selectedDays, day] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboard-step3");
  };

  return (
    <div className="p-6 lg:p-8 flex flex-col justify-between h-full min-h-full">
      <div>
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-neutral-100">
          <h2 className="font-['Red_Hat_Display'] font-bold text-xl md:text-2xl lg:text-3xl text-[#1D1D1D] tracking-tight">
            Service Category
          </h2>

          {/* Navigation Buttons (Back & Submit) */}
          <div className="flex gap-3">
            {/* Circular Back Button */}
            <button
              type="button"
              onClick={() => navigate("/onboard")}
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

            {/* Circular Submit Button */}
            <button
              type="submit"
              form="service-category-form"
              className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#1D1D1D] bg-[#1D1D1D] hover:bg-neutral-800 text-white active:scale-95 transition-all cursor-pointer shadow-sm"
              aria-label="Submit"
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

        {/* Form Container */}
        <form
          id="service-category-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Category Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[800px] mx-auto">
            {serviceCategories.map((category) => {
              const isSelected = selectedCategory === category.title;
              return (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category.title)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl cursor-pointer transition-all duration-300 border-2 text-center h-28 ${
                    isSelected
                      ? "border-black bg-neutral-50 shadow-md scale-102"
                      : "border-transparent bg-neutral-50/50 hover:bg-neutral-50 hover:border-neutral-200"
                  }`}
                >
                  <div className="mb-2 transition-transform duration-300 transform hover:scale-110">
                    {category.icon}
                  </div>
                  <span className="font-['Red_Hat_Display'] font-bold text-xs md:text-sm text-neutral-800 tracking-tight">
                    {category.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Form Fields Section */}
          <div className="max-w-[500px] mx-auto border-t border-neutral-100 pt-4">
            <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-2 items-center">
              {/* Service Duration Heading Row */}
              <div className="font-['Red_Hat_Display'] font-bold text-lg text-neutral-800 col-span-1">
                Service Duration
              </div>
              <div className="col-span-1 flex justify-start">
                <button
                  type="button"
                  onClick={() =>
                    setDurationType(
                      durationType === "RECURRENCE" ? "ONE-TIME" : "RECURRENCE",
                    )
                  }
                  className="px-5 py-1.5 bg-[#14121F] text-white text-xs font-semibold rounded-full tracking-wider shadow-sm select-none hover:bg-neutral-800 transition-all active:scale-95 cursor-pointer"
                >
                  {durationType === "RECURRENCE" ? "Recurrence" : "One-time"}
                </button>
              </div>

              {/* Start Date / Date */}
              <label
                htmlFor="startDate"
                className="text-sm font-semibold text-neutral-700 font-['Red_Hat_Display']"
              >
                {durationType === "RECURRENCE" ? "Start Date" : "Date"}
              </label>
              <div>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full max-w-[280px] h-10 bg-white border border-neutral-300 rounded-xl px-4 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                  required
                />
              </div>

              {/* One-Time Specific Fields */}
              {durationType === "ONE-TIME" && (
                <>
                  {/* Start Time */}
                  <label
                    htmlFor="startTime"
                    className="text-sm font-semibold text-neutral-700 font-['Red_Hat_Display']"
                  >
                    Start Time
                  </label>
                  <div>
                    <input
                      type="time"
                      id="startTime"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full max-w-[280px] h-10 bg-white border border-neutral-300 rounded-xl px-4 font-['Red_Hat_Display'] text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                      required
                    />
                  </div>

                  {/* Number of Hours */}
                  <label
                    htmlFor="durationHours"
                    className="text-sm font-semibold text-neutral-700 font-['Red_Hat_Display']"
                  >
                    Number of Hours
                  </label>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="number"
                      id="durationHours"
                      min="1"
                      max="24"
                      value={durationHours}
                      onChange={(e) =>
                        setDurationHours(parseInt(e.target.value) || 1)
                      }
                      className="w-16 h-10 bg-white border border-neutral-300 rounded-xl px-2 text-center font-['Red_Hat_Display'] text-sm font-bold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                      required
                    />
                    <span className="text-sm font-semibold text-neutral-500 font-['Red_Hat_Display']">
                      Hour(s)
                    </span>
                  </div>
                </>
              )}

              {durationType === "RECURRENCE" && (
                <>
                  {/* Repeat */}
                  <label
                    htmlFor="repeatOption"
                    className="text-sm font-semibold text-neutral-700 font-['Red_Hat_Display']"
                  >
                    Repeat
                  </label>
                  <div>
                    <select
                      id="repeatOption"
                      value={repeatOption}
                      onChange={(e) => setRepeatOption(e.target.value)}
                      className="w-full max-w-[280px] h-10 bg-white border border-neutral-300 rounded-xl px-4 font-['Red_Hat_Display'] text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm cursor-pointer"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>

                  {/* Every */}
                  <label
                    htmlFor="repeatEvery"
                    className="text-sm font-semibold text-neutral-700 font-['Red_Hat_Display']"
                  >
                    Every
                  </label>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="number"
                      id="repeatEvery"
                      min="1"
                      max="12"
                      value={repeatEvery}
                      onChange={(e) =>
                        setRepeatEvery(parseInt(e.target.value) || 1)
                      }
                      className="w-16 h-10 bg-white border border-neutral-300 rounded-xl px-2 text-center font-['Red_Hat_Display'] text-sm font-bold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                      required
                    />
                    <span className="text-sm font-semibold text-neutral-500 font-['Red_Hat_Display']">
                      {repeatOption === "Daily"
                        ? "Day(s)"
                        : repeatOption === "Weekly"
                          ? "Week(s)"
                          : "Month(s)"}
                    </span>
                  </div>

                  {/* On Weekdays - only show if repeat is Weekly */}
                  {repeatOption === "Weekly" && (
                    <>
                      <span className="text-sm font-semibold text-neutral-700 font-['Red_Hat_Display']">
                        On
                      </span>
                      <div className="flex gap-2">
                        {weekdays.map((day, idx) => {
                          const isDaySelected = selectedDays.includes(day);
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => toggleDay(day)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center border font-['Red_Hat_Display'] text-xs font-bold transition-all ${
                                isDaySelected
                                  ? "border-black bg-black text-white shadow-sm"
                                  : "border-neutral-300 text-neutral-500 hover:border-neutral-500 hover:text-neutral-800 bg-white"
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* End Date */}
                  <label
                    htmlFor="endDate"
                    className="text-sm font-semibold text-neutral-700 font-['Red_Hat_Display']"
                  >
                    End Date
                  </label>
                  <div>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full max-w-[280px] h-10 bg-white border border-neutral-300 rounded-xl px-4 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                      required
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceCategory;
