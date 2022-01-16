import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useAsyncFn } from "react-use";
import { v4 as uuid } from "uuid";
import { fetchTaskInformation } from "../../../api/externalTask";
import { url2ExternalTaskId } from "../../../helper/url";

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
  const { control } = useFormContext<ContestTaskFormFieldsData>();
  const { fields, append, update } = useFieldArray({
    control,
    name: "tasks",
  });

  const taskUrlRef = useRef<HTMLInputElement>(null);
  const [{ loading }, onAdd] = useAsyncFn(async () => {
    const url = taskUrlRef.current?.value;
    const externalTaskId = url && url2ExternalTaskId(url);
    const taskInfo =
      externalTaskId && (await fetchTaskInformation(externalTaskId));

    console.log(taskInfo);

    if (taskInfo) {
      console.log(taskInfo);
      append({
        id: uuid(),
        name: taskInfo.title ?? "",
        externalTaskId,
        score: "100",
        originalScore: (taskInfo.score ?? 0).toString(),
      });
      taskUrlRef.current.value = "";
    }
  }, [append]);

  const onUpdate = useCallback(
    <T extends keyof FormTaskData>(
      index: number,
      key: T,
      value: FormTaskData[T]
    ) => {
      update(index, {
        ...fields[index],
        [key]: value,
      });
    },
    [fields, update]
  );

  return (
    <>
      <Table size={"sm"} overflowX={"auto"}>
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
                  value={task.score}
                  size="xs"
                  onChange={(e) => onUpdate(index, "score", e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={task.originalScore}
                  size="xs"
                  onChange={(e) =>
                    onUpdate(index, "originalScore", e.target.value)
                  }
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <InputGroup size={"md"}>
        <Input
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
    </>
  );
};
