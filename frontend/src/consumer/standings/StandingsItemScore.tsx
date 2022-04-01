import { useStandingsItem } from "../../hook/context/StandingsItemContext";

export const StandingsItemScore = () => {
  const { score } = useStandingsItem();

  return <span>{`${score.score}(${score.submissionPenalty})`}</span>;
};
