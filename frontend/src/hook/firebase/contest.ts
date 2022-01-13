import { DummyContests } from "../../dummy/contest";

export const useFetchContest = (contestId: string) => {
  return DummyContests.find(({ id }) => id === contestId);
};

export const useFetchContests = () => {
  return DummyContests;
};
