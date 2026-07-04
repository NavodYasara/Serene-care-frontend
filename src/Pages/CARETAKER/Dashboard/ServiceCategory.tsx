import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Service category definitions
interface ServiceType {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const ServiceCategory: React.FC = () => {
  const navigate = useNavigate();

  // Form states
  const [selectedCategory, setSelectedCategory] = useState<string>("Personal Care");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [repeatOption, setRepeatOption] = useState<string>("Weekly");
  const [repeatEvery, setRepeatEvery] = useState<number>(1);
  const [selectedDays, setSelectedDays] = useState<string[]>(["W"]);

  const serviceCategories: ServiceType[] = [
    {
      id: "personal",
      title: "Personal Care",
      icon: (
        <svg className="w-12 h-12 text-[#2E8B57]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="24" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="3" fill="#E6F4EA"/>
          <path d="M8 26L32 6L56 26" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
          <circle cx="32" cy="38" r="8" stroke="currentColor" strokeWidth="3" fill="white"/>
          <path d="M32 34V42M28 38H36" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: "nursing",
      title: "Nursing Support",
      icon: (
        <svg className="w-12 h-12 text-[#FF6B6B]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="20" r="10" stroke="currentColor" strokeWidth="3" fill="#FFEAEB"/>
          <path d="M14 50C14 40 22 34 32 34C42 34 50 40 50 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <path d="M26 14H38M32 10V18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <rect x="24" y="44" width="16" height="12" rx="2" fill="currentColor"/>
          <path d="M18 36C18 36 24 38 32 38C40 38 46 36 46 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: "companionship",
      title: "Companionship",
      icon: (
        <svg className="w-12 h-12 text-[#4A90E2]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="22" cy="20" r="8" stroke="currentColor" strokeWidth="3" fill="#E6F0FA"/>
          <circle cx="42" cy="22" r="7" stroke="currentColor" strokeWidth="3" fill="#E6F0FA"/>
          <path d="M8 52C8 42 15 36 22 36C29 36 34 40 35 46" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <path d="M34 52C34 44 38 38 44 38C50 38 56 43 56 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <path d="M26 30C28 32 34 32 36 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: "therapy",
      title: "Physical Therapy",
      icon: (
        <svg className="w-12 h-12 text-[#9B5DE5]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="14" r="6" stroke="currentColor" strokeWidth="3" fill="#F3EAFE"/>
          <path d="M20 28H44M32 20V38L24 54M32 38L40 54" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="20" cy="28" r="3" fill="currentColor"/>
          <circle cx="44" cy="28" r="3" fill="currentColor"/>
        </svg>
      ),
    },
  ];

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requestDetails = {
      category: selectedCategory,
      startDate,
      endDate,
      recurrence: {
        repeatOption,
        repeatEvery,
        selectedDays,
      },
    };
    console.log("Care Request Submitted:", requestDetails);
    alert("Care request submitted successfully!");
    navigate("/");
  };

  return (
    <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-between h-full min-h-full">
      <div>
        {/* Header Area */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-100">
          <h2 className="font-['Red_Hat_Display'] font-bold text-2xl md:text-3xl lg:text-4xl text-[#1D1D1D] tracking-tight">
            Service Category
          </h2>
          {/* Circular arrow submit button */}
          <button
            type="submit"
            form="service-category-form"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1D1D1D] hover:bg-neutral-800 text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            title="Submit Request"
          >
            <svg
              className="w-5 h-5 stroke-current fill-none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        {/* Form Container */}
        <form id="service-category-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Category Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[800px] mx-auto">
            {serviceCategories.map((category) => {
              const isSelected = selectedCategory === category.title;
              return (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category.title)}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2 text-center h-36 ${
                    isSelected
                      ? "border-black bg-neutral-50 shadow-md scale-102"
                      : "border-transparent bg-neutral-50/50 hover:bg-neutral-50 hover:border-neutral-200"
                  }`}
                >
                  <div className="mb-3 transition-transform duration-300 transform hover:scale-110">
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
          <div className="max-w-[500px] mx-auto border-t border-neutral-100 pt-6">
            <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-4 items-center">
              {/* Service Duration Heading Row */}
              <div className="font-['Red_Hat_Display'] font-bold text-lg text-neutral-800 col-span-1">
                Service Duration
              </div>
              <div className="col-span-1 flex justify-start">
                <span className="px-5 py-1.5 bg-[#14121F] text-white text-xs font-semibold rounded-full tracking-wider shadow-sm select-none">
                  Recurrence
                </span>
              </div>

              {/* Start Date */}
              <label htmlFor="startDate" className="text-sm font-semibold text-neutral-700 font-['Red_Hat_Display']">
                Start Date
              </label>
              <div>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full max-w-[280px] h-11 bg-white border border-neutral-300 rounded-xl px-4 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                  required
                />
              </div>

              {/* Repeat */}
              <label htmlFor="repeatOption" className="text-sm font-semibold text-neutral-700 font-['Red_Hat_Display']">
                Repeat
              </label>
              <div>
                <select
                  id="repeatOption"
                  value={repeatOption}
                  onChange={(e) => setRepeatOption(e.target.value)}
                  className="w-full max-w-[280px] h-11 bg-white border border-neutral-300 rounded-xl px-4 font-['Red_Hat_Display'] text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm cursor-pointer"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

              {/* Every */}
              <label htmlFor="repeatEvery" className="text-sm font-semibold text-neutral-700 font-['Red_Hat_Display']">
                Every
              </label>
              <div className="flex items-center gap-2.5">
                <input
                  type="number"
                  id="repeatEvery"
                  min="1"
                  max="12"
                  value={repeatEvery}
                  onChange={(e) => setRepeatEvery(parseInt(e.target.value) || 1)}
                  className="w-16 h-11 bg-white border border-neutral-300 rounded-xl px-2 text-center font-['Red_Hat_Display'] text-sm font-bold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                  required
                />
                <span className="text-sm font-semibold text-neutral-500 font-['Red_Hat_Display']">
                  Week(s)
                </span>
              </div>

              {/* On Weekdays */}
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

              {/* End Date */}
              <label htmlFor="endDate" className="text-sm font-semibold text-neutral-700 font-['Red_Hat_Display']">
                End Date
              </label>
              <div>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full max-w-[280px] h-11 bg-white border border-neutral-300 rounded-xl px-4 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-3 pt-4 max-w-[500px] mx-auto">
            <button
              type="button"
              onClick={() => navigate("/onboard")}
              className="w-full sm:w-[120px] h-11 border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 font-['Red_Hat_Display'] font-semibold text-sm rounded-xl transition-all cursor-pointer"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full sm:w-[120px] h-11 bg-[#1D1D1D] hover:bg-neutral-800 text-white font-['Red_Hat_Display'] font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceCategory;
