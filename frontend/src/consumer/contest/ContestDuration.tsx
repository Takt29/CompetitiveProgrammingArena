import { useMemo } from "react";
import { formatDuration, getDuration } from "../../helper/dateTime";
import { useContest } from "../../hook/context/ContestContext";

export const ContestDuration = () => {
  const { startAt, endAt } = useContest();

  const duration = useMemo(() => {
    const days = getDuration(startAt, endAt, "day");
    const hoursAndMins = formatDuration(startAt, endAt, "HH:mm");

    if (days >= 1) {
      return `${days}d ${hoursAndMins}`;
    } else {
      return hoursAndMins;
    }
  }, [endAt, startAt]);

  return <span>{duration}</span>;
};
