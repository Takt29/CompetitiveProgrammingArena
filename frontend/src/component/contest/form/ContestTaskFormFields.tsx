import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useAsyncFn } from "react-use";
import {
  fetchExternalContestTasks,
  fetchTaskInformation,
} from "../../../api/externalTask";
import { sleep } from "../../../helper/sleep";
import { url2ExternalContestId, url2ExternalTaskId } from "../../../helper/url";

type FormTaskData = {
  id: string;
  name: string;
  externalTaskId: string;
  score: string;
  originalScore: string;
};

export type ContestTaskFormFieldsData = {
  tasks: FormTaskData[];
};

export const ContestTaskFormFields = () => {
  const { control, register } = useFormContext<ContestTaskFormFieldsData>();
  const { fields, append } = useFieldArray({
    control,
    name: "tasks",
  });

  const toast = useToast();

  const taskUrlRef = useRef<HTMLInputElement>(null);
  const [{ loading }, onAdd] = useAsyncFn(async () => {
    try {
      const url = taskUrlRef.current?.value;
      const externalTaskId = url && url2ExternalTaskId(url);
      const externalContestId = url && url2ExternalContestId(url);

      const externalTaskIds: string[] = [];

      if (externalContestId) {
        externalTaskIds.push(
          ...((await fetchExternalContestTasks(externalContestId)) ?? [])
        );
        await sleep(1000);
      } else if (externalTaskId) {
        externalTaskIds.push(externalTaskId);
      }

      let appended = false;

      for (let i = 0; i < externalTaskIds.length; i++) {
        if (i > 0) await sleep(2000);

        const externalTaskId = externalTaskIds[i];

        const taskInfo = await fetchTaskInformation(externalTaskId);

        if (taskInfo) {
          append({
            name: taskInfo.title ?? "",
            externalTaskId,
            score: (taskInfo.score ?? 100).toString(),
            originalScore: (taskInfo.score ?? 0).toString(),
          });

          appended = true;
        }
      }

      if (appended) {
        if (taskUrlRef.current) {
          taskUrlRef.current.value = "";
        }
      } else {
        throw new Error("Not found.");
      }
    } catch (e) {
      console.log(e);
      toast({
        title: "Failed to add task.",
        status: "error",
      });
    }
  }, [append, toast]);

  return (
    <>
      <Box overflowX={"auto"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Name</Th>
              <Th>ID</Th>
              <Th>Score</Th>
              <Th>Original Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {fields.map((task, index) => (
              <Tr key={task.id}>
                <Td>{index + 1}</Td>
                <Td>{task.name}</Td>
                <Td>{task.externalTaskId}</Td>
                <Td>
                  <Input
                    type="number"
                    size="xs"
                    defaultValue={task.score}
                    {...register(`tasks.${index}.score`)}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    size="xs"
                    defaultValue={task.originalScore}
                    {...register(`tasks.${index}.originalScore`)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <FormControl>
        <FormLabel htmlFor="task-url">Task URL</FormLabel>
        <InputGroup size={"md"}>
          <Input
            name="task-url"
            paddingRight={16}
            ref={taskUrlRef}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                if (!loading) onAdd();
                e.preventDefault();
              }
            }}
          />
          <InputRightElement width={16}>
            <Button
              height={8}
              size={"sm"}
              type="button"
              onClick={onAdd}
              disabled={loading}
              isLoading={loading}
            >
              Add
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
};
