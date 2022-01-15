import { Box } from "@chakra-ui/react";
import { useContest } from "../../../hook/context/ContestContext";
import { useFetchStandings } from "../../../hook/firebase/standings";
import { useFetchTasks } from "../../../hook/firebase/task";
import { Standings } from "../../standings/list/Standings";

export const ContestStandingsTab = () => {
  const { id: contestId } = useContest();
  const standings = useFetchStandings(contestId);
  const tasks = useFetchTasks(contestId);
  return (
    <Box>
      <Standings standingsItems={standings} tasks={tasks} />
    </Box>
  );
};
