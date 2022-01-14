import { useSubmission } from "../../hook/context/SubmissionContext";

export const SubmissionStatus = () => {
  const { status } = useSubmission();

  return <span>{status}</span>;
};
