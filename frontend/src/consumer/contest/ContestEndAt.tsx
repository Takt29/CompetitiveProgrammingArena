import { useMemo } from "react";
import { formatDateTime } from "../../helper/dateTime";
import { useContest } from "../../hook/context/ContestContext";

export const ContestEndAt = () => {
  const { endAt } = useContest();

  const formattedEndAt = useMemo(
    () => formatDateTime(endAt, "YYYY-MM-DD HH:mm:ss"),
    [endAt]
  );

  return <span>{formattedEndAt}</span>;
};
