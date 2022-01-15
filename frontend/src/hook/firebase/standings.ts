import { DummyStandingsItems } from "../../dummy/standings";
import { Contest } from "../../type/contest";

export const useFetchStandings = (contestId: Contest["id"]) => {
  return DummyStandingsItems.filter(
    (item) => item.contestId === contestId
  ).sort((a, b) =>
    a.score.score !== b.score.score
      ? b.score.score - a.score.score
      : a.score.penalty - b.score.penalty
  );
};
