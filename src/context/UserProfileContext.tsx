import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Define the structure of our context data
interface UserProfileContextType {
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
}

// 2. Create the Context with a default value of undefined
const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined,
);

// 3. Create the Provider component
export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profileData, setProfileData] = useState<any>({
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
  });

  return (
    <UserProfileContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </UserProfileContext.Provider>
  );
};

// 4. Create a custom hook to use the context easily
export const useUserProfileContext = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error(
      "useCaretakerProfile must be used within a CaretakerProfileProvider",
    );
  }
  return context;
};
