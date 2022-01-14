import { DummyTasks } from "../../dummy/task";

export const useFetchTasks = (contestId: string) => {
  return DummyTasks.filter((task) => task.contest === contestId);
};

export const useFetchTask = (taskId: string) => {
  return DummyTasks.find((task) => task.id === taskId);
};
