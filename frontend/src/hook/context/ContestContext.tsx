import { createContext, useContext } from "react";
import { Contest } from "../../type/Contest";

const ContestContext = createContext<Contest | null>(null);

export const ContestProvider = ContestContext.Provider;

export const useContest = (): Contest => {
  const context = useContext(ContestContext);
  if (!context) {
    throw new Error("useContest must be used inside ContestProvider.");
  }
  return context;
};
