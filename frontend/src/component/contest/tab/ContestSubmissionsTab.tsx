import { Box } from "@chakra-ui/react";
import { limit, orderBy, where } from "firebase/firestore";
import { useContest } from "../../../hook/context/ContestContext";
import { useFetchSubmissions } from "../../../hook/firebase/submission";
import { SubmissionList } from "../../submission/list/SubmissionList";

export const ContestSubmissionsTab = () => {
  const { id: contestId } = useContest();
  const [submissions] = useFetchSubmissions([
    where("contestId", "==", contestId),
    orderBy("submittedAt", "desc"),
    limit(30),
  ]);

  return (
    <Box>
      <SubmissionList submissions={submissions ?? []} />
    </Box>
  );
};
