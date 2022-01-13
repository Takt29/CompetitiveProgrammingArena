import { useMemo } from "react";
import { formatDateTime } from "../../helper/dateTime";
import { useContest } from "../../hook/context/ContestContext";

export const ContestStartAt = () => {
  const { startAt } = useContest();

  const formattedStartAt = useMemo(
    () => formatDateTime(startAt, "YYYY-MM-DD HH:mm:ss"),
    [startAt]
  );

  return <span>{formattedStartAt}</span>;
};
