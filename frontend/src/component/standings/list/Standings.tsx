import { Box, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { StandingsItemScore } from "../../../consumer/standings/StandingsItemScore";
import { StandingsItemTaskSubmittedAt } from "../../../consumer/standings/StandingsItemTaskSubmittedAt";
import { StandingsItemTaskScore } from "../../../consumer/standings/StandingsItemTaskScore";
import { StandingsItemUserName } from "../../../consumer/standings/StandingsItemUserName";
import { StandingsItemProvider } from "../../../hook/context/StandingsItemContext";
import { TaskProvider } from "../../../hook/context/TaskContext";
import { StandingsItem } from "../../../type/standings";
import { Task } from "../../../type/task";
import { StandingsItemTimePenalty } from "../../../consumer/standings/StandingsItemTimePenalty";
import { TaskNumber } from "../../../consumer/task/TaskNumber";

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
            <Th>Score</Th>
            {tasks.map((task) => (
              <TaskProvider key={task.id} value={task}>
                <Th>
                  <TaskNumber />
                </Th>
              </TaskProvider>
            ))}
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
                <Td>
                  <StandingsItemScore />
                  <br />
                  <StandingsItemTimePenalty />
                </Td>
                {tasks.map(({ id: taskId }) => (
                  <Td key={taskId} whiteSpace="nowrap">
                    <StandingsItemTaskScore taskId={taskId} />
                    <br />
                    <StandingsItemTaskSubmittedAt taskId={taskId} />
                  </Td>
                ))}
              </Tr>
            </StandingsItemProvider>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
