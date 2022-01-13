import { createContext, useContext } from "react";
import { Task } from "../../type/task";

const TaskContext = createContext<Task | null>(null);

export const TaskProvider = TaskContext.Provider;

export const useTask = (): Task => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used inside TaskProvider.");
  }
  return context;
};
