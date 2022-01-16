import { Box } from "@chakra-ui/react";
import { where } from "firebase/firestore";
import { useContest } from "../../../hook/context/ContestContext";
import { useFetchStandings } from "../../../hook/firebase/standings";
import { useFetchTasks } from "../../../hook/firebase/task";
import { Standings } from "../../standings/list/Standings";

export const ContestStandingsTab = () => {
  const { id: contestId } = useContest();
  const standings = useFetchStandings(contestId);
  const [tasks] = useFetchTasks([where("contestId", "==", contestId)]);
  return (
    <Box>
      <Standings standingsItems={standings} tasks={tasks ?? []} />
    </Box>
  );
};
