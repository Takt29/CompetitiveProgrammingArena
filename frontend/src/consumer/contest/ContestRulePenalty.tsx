import { useContest } from "../../hook/context/ContestContext";

export const ContestRulePenalty = () => {
  const {
    rule: { penaltyMins },
  } = useContest();

  return <span>{penaltyMins}mins</span>;
};
