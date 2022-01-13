import { useTask } from "../../hook/context/TaskContext";

export const TaskScore = () => {
  const { score } = useTask();

  return <span>{score}</span>;
};
