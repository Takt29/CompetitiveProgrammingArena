import { Box } from "@chakra-ui/react";
import { useContest } from "../../../hook/context/ContestContext";
import { useFetchTasks } from "../../../hook/firebase/task";
import { TaskList } from "../../task/list/TaskList";

export const ContestTasksTab = () => {
  const { id: contestId } = useContest();
  const tasks = useFetchTasks(contestId);

  return (
    <Box>
      <TaskList tasks={tasks} />
    </Box>
  );
};
