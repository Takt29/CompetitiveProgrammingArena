import { createContext, useContext } from "react";
import { StandingsItem } from "../../type/standings";

const StandingsItemContext = createContext<StandingsItem | null>(null);

export const StandingsItemProvider = StandingsItemContext.Provider;

export const useStandingsItem = (): StandingsItem => {
  const context = useContext(StandingsItemContext);
  if (!context) {
    throw new Error(
      "useStandingsItem must be used inside StandingsItemProvider."
    );
  }
  return context;
};
