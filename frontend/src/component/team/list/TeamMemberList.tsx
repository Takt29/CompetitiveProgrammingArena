import { Box, Table, Tbody } from "@chakra-ui/react";
import { DummyUsers } from "../../../dummy/user";
import { User } from "../../../type/user";
import { TeamMemberListItem } from "./TeamMemberListItem";

export const TeamMemberList = () => {
  const members: User[] = DummyUsers;

  return (
    <Box overflowX={"auto"}>
      <Table variant={"simple"} minWidth={"xs"}>
        <Tbody>
          {members.map((member) => (
            <TeamMemberListItem key={member.id} member={member} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
