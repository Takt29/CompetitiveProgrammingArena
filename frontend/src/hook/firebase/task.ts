import { DummyTasks } from "../../dummy/task";

export const useFetchTasks = (contestId: string) => {
  return DummyTasks.filter((task) => task.contest === contestId);
};
