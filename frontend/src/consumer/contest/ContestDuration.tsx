import { useMemo } from "react";
import { formatContestDuration } from "../../helper/dateTime";
import { useContest } from "../../hook/context/ContestContext";

export const ContestDuration = () => {
  const { startAt, endAt } = useContest();

  const duration = useMemo(
    () => formatContestDuration(startAt, endAt),
    [endAt, startAt]
  );

  return <span>{duration}</span>;
};
