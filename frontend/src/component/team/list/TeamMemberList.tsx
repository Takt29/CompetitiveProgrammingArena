import { Box, Table, Tbody } from "@chakra-ui/react";
import { TeamMember } from "../../../type/team";
import { TeamMemberListItem } from "./TeamMemberListItem";

type Props = {
  members: TeamMember[];
};

export const TeamMemberList = (props: Props) => {
  const { members } = props;

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
