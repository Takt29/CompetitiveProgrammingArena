import { Box } from "@chakra-ui/react";
import { useContest } from "../../../hook/context/ContestContext";
import { useFetchSubmissions } from "../../../hook/firebase/submission";
import { SubmissionList } from "../../submission/list/SubmissionList";

export const ContestSubmissionsTab = () => {
  const { id: contestId } = useContest();
  const submissions = useFetchSubmissions(contestId);
  return (
    <Box>
      <SubmissionList submissions={submissions} />
    </Box>
  );
};
