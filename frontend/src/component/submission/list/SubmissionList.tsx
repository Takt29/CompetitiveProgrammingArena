import { Table, Th, Tr, Td, Thead, Tbody, Box } from "@chakra-ui/react";
import { SubmissionExternalLink } from "../../../consumer/submission/SubmissionExternalLink";
import { SubmissionScore } from "../../../consumer/submission/SubmissionScore";
import { SubmissionStatus } from "../../../consumer/submission/SubmissionStatus";
import { SubmissionSubmittedAt } from "../../../consumer/submission/SubmissionSubmittedAt";
import { SubmissionSubmittedBy } from "../../../consumer/submission/SubmissionSubmittedBy";
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
            <Th>User</Th>
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
                  <SubmissionSubmittedBy />
                </Td>
                <Td>
                  <SubmissionStatus />
                </Td>
                <Td>
                  <SubmissionScore />
                </Td>
                <Td>
                  <SubmissionExternalLink>詳細</SubmissionExternalLink>
                </Td>
              </Tr>
            </SubmissionProvider>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
