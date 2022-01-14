import { useSubmission } from "../../hook/context/SubmissionContext";
import { TaskProvider } from "../../hook/context/TaskContext";
import { useFetchTask } from "../../hook/firebase/task";
import { TaskName } from "../task/TaskName";

type Props = {
  link?: boolean;
};

export const SubmissionTaskName = (props: Props) => {
  const { link } = props;

  const { taskId } = useSubmission();
  const task = useFetchTask(taskId);

  if (!task) return null;

  return (
    <TaskProvider value={task}>
      <TaskName link={link} />
    </TaskProvider>
  );
};
