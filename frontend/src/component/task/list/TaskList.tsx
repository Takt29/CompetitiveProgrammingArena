import { Table, Th, Tr, Td, Thead, Tbody, Box } from "@chakra-ui/react";
import { TaskName } from "../../../consumer/task/TaskName";
import { TaskNumber } from "../../../consumer/task/TaskNumber";
import { TaskScore } from "../../../consumer/task/TaskScore";
import { TaskSite } from "../../../consumer/task/TaskSite";
import { TaskProvider } from "../../../hook/context/TaskContext";
import { Task } from "../../../type/task";

type Props = {
  tasks: Task[];
};

export const TaskList = (props: Props) => {
  const { tasks } = props;

  return (
    <Box overflowX={"auto"}>
      <Table variant={"simple"} size={"sm"} minWidth={"lg"}>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Name</Th>
            <Th>Site</Th>
            <Th>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task) => (
            <TaskProvider key={task.id} value={task}>
              <Tr>
                <Td>
                  <TaskNumber />
                </Td>
                <Td>
                  <TaskName link />
                </Td>
                <Td>
                  <TaskSite />
                </Td>
                <Td>
                  <TaskScore />
                </Td>
              </Tr>
            </TaskProvider>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
