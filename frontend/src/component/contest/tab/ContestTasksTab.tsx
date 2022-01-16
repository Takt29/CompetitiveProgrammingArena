import { Box } from "@chakra-ui/react";
import { limit, orderBy, where } from "firebase/firestore";
import { useContest } from "../../../hook/context/ContestContext";
import { useFetchTasks } from "../../../hook/firebase/task";
import { TaskList } from "../../task/list/TaskList";

export const ContestTasksTab = () => {
  const { id: contestId } = useContest();
  const [tasks] = useFetchTasks([
    where("contestId", "==", contestId),
    orderBy("index", "asc"),
    limit(30),
  ]);

  return (
    <Box>
      <TaskList tasks={tasks ?? []} />
    </Box>
  );
};
