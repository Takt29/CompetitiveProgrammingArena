import { createContext, useContext } from "react";
import { User } from "../../type/user";

const UserContext = createContext<User | null>(null);

export const UserProvider = UserContext.Provider;

export const useUser = (): User => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside UserProvider.");
  }
  return context;
};
