import { createContext, useContext } from "react";
import { Contestant } from "../../type/contestant";

const ContestantContext = createContext<Contestant | null>(null);

export const ContestantProvider = ContestantContext.Provider;

export const useContestant = (): Contestant => {
  const context = useContext(ContestantContext);
  if (!context) {
    throw new Error("useContestant must be used inside ContestantProvider.");
  }
  return context;
};
