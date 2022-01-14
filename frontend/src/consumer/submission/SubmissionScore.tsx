import { useSubmission } from "../../hook/context/SubmissionContext";

export const SubmissionScore = () => {
  const { score } = useSubmission();

  return <span>{score}</span>;
};
