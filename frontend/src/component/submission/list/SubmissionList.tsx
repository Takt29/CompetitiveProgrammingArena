import { Table, Th, Tr, Td, Thead, Tbody, Box } from "@chakra-ui/react";
import { SubmissionScore } from "../../../consumer/submission/SubmissionScore";
import { SubmissionStatus } from "../../../consumer/submission/SubmissionStatus";
import { SubmissionSubmittedAt } from "../../../consumer/submission/SubmissionSubmittedAt";
import { SubmissionTaskName } from "../../../consumer/submission/SubmissionTaskName";
import { SubmissionProvider } from "../../../hook/context/SubmissionContext";
import { Submission } from "../../../type/submission";

type Props = {
  submissions: Submission[];
};

export const SubmissionList = (props: Props) => {
  const { submissions } = props;

  return (
    <Box overflowX={"auto"}>
      <Table variant={"simple"} size={"sm"} minWidth={"lg"}>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Task Name</Th>
            <Th>Status</Th>
            <Th>Score</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {submissions.map((submission) => (
            <SubmissionProvider key={submission.id} value={submission}>
              <Tr>
                <Td>
                  <SubmissionSubmittedAt />
                </Td>
                <Td>
                  <SubmissionTaskName link />
                </Td>
                <Td>
                  <SubmissionStatus />
                </Td>
                <Td>
                  <SubmissionScore />
                </Td>
              </Tr>
            </SubmissionProvider>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
