import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface UserContextType {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
export type { UserContextType };
