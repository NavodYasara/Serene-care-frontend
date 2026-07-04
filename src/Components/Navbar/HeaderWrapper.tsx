import { FiBell, FiChevronDown } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const HeaderWrapper = () => {
  const profileData = useSelector((state: RootState) => state.profile.profileData);

  // --- UI PLACEHOLDERS ---
  const greeting = "Good Morning"; // Dynamic based on time of day (Morning/Afternoon/Evening)
  const userName = `${profileData.firstName || ""} ${profileData.lastName || ""}`;
  const userRole = "Caretaker"; // Dynamic from user profile (caretaker / caregiver / admin)
  const currentDate = "Saturday, July 4, 2026"; // Dynamic using new Date()
  const avatarLetter = userName.charAt(0) || "U";

  return (
    <div className="header mx-3 mt-1 h-17 flex items-center justify-between">
      {/* Left side: Greeting & Subtitle (sized down to fit h-16) */}
      <div className="flex flex-col justify-center">
        <h3 className="text font-bold text-neutral-800 font-['Red_Hat_Display'] leading-none">
          {greeting}, <span className="text-[#0f4c43]">{userName}</span>!
        </h3>
        <p className="text-[10px] md:text-xs text-neutral-500 font-medium font-['Red_Hat_Display'] mt-0.5 leading-none">
          {currentDate}
        </p>
      </div>

      {/* Right side: Actions & Profile (sized down to fit h-16) */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 text-neutral-600 hover:text-neutral-800 bg-white hover:bg-neutral-50 rounded-full shadow-sm border border-neutral-200 transition-all cursor-pointer flex items-center justify-center">
          <FiBell className="text-base" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
        </button>

        {/* Profile Info Widget */}
        <div className="flex items-center gap-2 bg-white p-1 pr-3 pl-1 rounded-full border border-neutral-200 shadow-sm hover:shadow transition-all cursor-pointer">
          {/* Avatar Circle */}
          <div className="w-7 h-7 bg-[#0f4c43] text-white flex items-center justify-center rounded-full font-bold text-xs select-none">
            {avatarLetter}
          </div>
          {/* Text Info */}
          <div className="hidden sm:flex flex-col text-left justify-center">
            <span className="text-xs font-bold text-neutral-800 font-['Red_Hat_Display'] leading-tight">
              {userName}
            </span>
            <span className="text-[8px] font-semibold text-neutral-400 font-['Red_Hat_Display'] uppercase tracking-wider leading-none">
              {userRole}
            </span>
          </div>
          {/* Chevron Indicator */}
          <FiChevronDown className="text-neutral-500 text-xs hidden sm:block" />
        </div>
      </div>
    </div>
  );
};

export default HeaderWrapper;
