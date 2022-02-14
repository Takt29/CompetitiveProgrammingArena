import { useMemo } from "react";
import { formatDateTime } from "../../helper/dateTime";
import { useSubmission } from "../../hook/context/SubmissionContext";

export const SubmissionSubmittedAt = () => {
  const { submittedAt } = useSubmission();

  const formattedSubmittedAt = useMemo(
    () => formatDateTime(submittedAt, "YYYY/MM/DD HH:mm:ss"),
    [submittedAt]
  );

  return <span>{formattedSubmittedAt}</span>;
};
