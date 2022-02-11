import { Box, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { StandingsItemScore } from "../../../consumer/standings/StandingsItemScore";
import { StandingsItemTaskSubmittedAt } from "../../../consumer/standings/StandingsItemTaskSubmittedAt";
import { StandingsItemTaskScore } from "../../../consumer/standings/StandingsItemTaskScore";
import { StandingsItemUserName } from "../../../consumer/standings/StandingsItemUserName";
import { TaskName } from "../../../consumer/task/TaskName";
import { StandingsItemProvider } from "../../../hook/context/StandingsItemContext";
import { TaskProvider } from "../../../hook/context/TaskContext";
import { StandingsItem } from "../../../type/standings";
import { Task } from "../../../type/task";
import { StandingsItemTimePenalty } from "../../../consumer/standings/StandingsItemTimePenalty";

type Props = {
  tasks: Task[];
  standingsItems: StandingsItem[];
};

export const Standings = (props: Props) => {
  const { tasks, standingsItems } = props;

  return (
    <Box overflowX={"auto"}>
      <Table variant={"simple"} size={"sm"} minWidth={"lg"}>
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>User</Th>
            {tasks.map((task) => (
              <TaskProvider key={task.id} value={task}>
                <Th>
                  <TaskName />
                </Th>
              </TaskProvider>
            ))}
            <Th>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {standingsItems.map((item, index) => (
            <StandingsItemProvider key={item.userId} value={item}>
              <Tr>
                <Td>{index + 1}</Td>
                <Td>
                  <StandingsItemUserName />
                </Td>
                {tasks.map(({ id: taskId }) => (
                  <Td key={taskId}>
                    <StandingsItemTaskScore taskId={taskId} />
                    <br />
                    <StandingsItemTaskSubmittedAt taskId={taskId} />
                  </Td>
                ))}
                <Td>
                  <StandingsItemScore />
                  <br />
                  <StandingsItemTimePenalty />
                </Td>
              </Tr>
            </StandingsItemProvider>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
