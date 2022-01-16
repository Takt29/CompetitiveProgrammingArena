import { StandingsSystemName } from "../../constant/StandingsSystemName";
import { useContest } from "../../hook/context/ContestContext";

export const ContestRuleSystem = () => {
  const {
    rule: { system },
  } = useContest();

  return <span>{StandingsSystemName[system]}</span>;
};
