import { Box } from "@chakra-ui/react";
import { orderBy, where } from "firebase/firestore";
import { useContest } from "../../../hook/context/ContestContext";
import { useFetchStandings } from "../../../hook/firebase/standings";
import { useFetchTasks } from "../../../hook/firebase/task";
import { Standings } from "../../standings/list/Standings";

export const ContestStandingsTab = () => {
  const { id: contestId } = useContest();
  const [standings] = useFetchStandings(contestId, [
    orderBy("sortKey", "desc"),
  ]);
  const [tasks] = useFetchTasks([
    where("contestId", "==", contestId),
    orderBy("index", "asc"),
  ]);
  return (
    <Box>
      <Standings standingsItems={standings ?? []} tasks={tasks ?? []} />
    </Box>
  );
};
