import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Table,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { limit, where } from "firebase/firestore";
import { useRef } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useAsyncFn } from "react-use";
import { searchUser } from "../../../api/user";

type FormMemberData = {
  userName: string;
  userId: string;
};

export type TeamMembersFormFieldsData = {
  members: FormMemberData[];
};

export const TeamMembersFormFields = () => {
  const { control } = useFormContext<TeamMembersFormFieldsData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const searchRef = useRef<HTMLInputElement>(null);
  const [{ loading }, onSearch] = useAsyncFn(async () => {
    const name = searchRef.current?.value;
    if (!name) return;

    const [user] = await searchUser(name, [
      where("name", "not-in", ["", ...fields.map(({ userName }) => userName)]),
      limit(1),
    ]);

    if (!user) return;

    append({
      userId: user.id,
      userName: user.name,
    });

    searchRef.current.value = "";
  }, [append, fields]);

  return (
    <>
      <Box overflowX={"auto"}>
        <Table size={"sm"}>
          <Tbody>
            {fields.map((member, index) => (
              <Tr key={member.id}>
                <Td>{member.userName}</Td>
                <Td onClick={() => remove(index)}>delete</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <FormControl>
        <InputGroup size={"md"}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>

          <Input
            placeholder="UserName"
            paddingRight={24}
            ref={searchRef}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                if (!loading) onSearch();
                e.preventDefault();
              }
            }}
          />
          <InputRightElement width={24}>
            <Button
              height={8}
              size={"sm"}
              type="button"
              onClick={onSearch}
              disabled={loading}
              isLoading={loading}
            >
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
};
