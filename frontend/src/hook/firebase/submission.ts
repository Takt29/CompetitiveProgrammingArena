import { DummySubmissions } from "../../dummy/submission";

export const useFetchSubmissions = (contestId: string) => {
  return DummySubmissions.filter(
    (submission) => submission.contestId === contestId
  );
};
