import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface OnboardFormData {
  fullName: string;
  nationalId: string;
  dateOfBirth: string;
  email: string;
  address: string;
  contactNo: string;
  emergencyContact: string;
}

const OnboardForm: React.FC = () => {
  const navigate = useNavigate();
  // State to hold the form values
  const [formData, setFormData] = useState<OnboardFormData>({
    fullName: "",
    nationalId: "",
    dateOfBirth: "",
    email: "",
    address: "",
    contactNo: "",
    emergencyContact: "",
  });

  // Handler to update values when user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    navigate("/onboard-step2");
  };

  return (
    <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-between h-full min-h-full">
      <div>
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-100">
          {/* Personal Information Title */}
          <h2 className="font-['Red_Hat_Display'] font-bold text-2xl md:text-3xl lg:text-4xl text-[#1D1D1D] tracking-tight">
            Personal Information
          </h2>
        </div>

        {/* Form Content */}
        <form id="onboard-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 max-w-[750px] mx-auto">
            {/* Full Name */}
            <div className="flex flex-col md:col-span-2">
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-neutral-700 mb-1.5 font-['Red_Hat_Display']"
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
                className="w-full h-11 bg-white border border-neutral-300 rounded-xl px-4 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                required
              />
            </div>

            {/* National ID */}
            <div className="flex flex-col">
              <label
                htmlFor="nationalId"
                className="block text-sm font-semibold text-neutral-700 mb-1.5 font-['Red_Hat_Display']"
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
                className="w-full h-11 bg-white border border-neutral-300 rounded-xl px-4 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-semibold text-neutral-700 mb-1.5 font-['Red_Hat_Display']"
              >
                Date of Birth
              </label>
              <input
                type="text"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                placeholder="1964 - 10 - 12"
                className="w-full h-11 bg-white border border-neutral-300 rounded-xl px-4 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-neutral-700 mb-1.5 font-['Red_Hat_Display']"
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
                className="w-full h-11 bg-white border border-neutral-300 rounded-xl px-4 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                required
              />
            </div>

            {/* Contact Number */}
            <div className="flex flex-col">
              <label
                htmlFor="contactNo"
                className="block text-sm font-semibold text-neutral-700 mb-1.5 font-['Red_Hat_Display']"
              >
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNo"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                placeholder="0112424321"
                className="w-full h-11 bg-white border border-neutral-300 rounded-xl px-4 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                required
              />
            </div>

            {/* Emergency Contact */}
            <div className="flex flex-col">
              <label
                htmlFor="emergencyContact"
                className="block text-sm font-semibold text-neutral-700 mb-1.5 font-['Red_Hat_Display']"
              >
                Emergency Contact
              </label>
              <input
                type="tel"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="0772424321"
                className="w-full h-11 bg-white border border-neutral-300 rounded-xl px-4 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                required
              />
            </div>

            {/* Address */}
            <div className="flex flex-col md:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-neutral-700 mb-1.5 font-['Red_Hat_Display']"
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
                className="w-full h-11 bg-white border border-neutral-300 rounded-xl px-4 font-['Red_Hat_Display'] text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-[100px] h-11 border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 font-['Red_Hat_Display'] font-semibold text-sm rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Home
            </button>
            <button
              type="submit"
              className="w-[100px] h-11 bg-[#1D1D1D] hover:bg-neutral-800 text-white font-['Red_Hat_Display'] font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardForm;
