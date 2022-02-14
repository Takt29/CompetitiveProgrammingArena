import { createContext, useContext } from "react";
import { Team } from "../../type/team";

const TeamContext = createContext<Team | null>(null);

export const TeamProvider = TeamContext.Provider;

export const useTeam = (): Team => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeam must be used inside TeamProvider.");
  }
  return context;
};
