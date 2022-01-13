import { useTask } from "../../hook/context/TaskContext";

export const TaskNumber = () => {
  const { index } = useTask();

  return <span>{index}</span>;
};
