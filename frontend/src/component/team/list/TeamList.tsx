import { Box, Table, Tbody } from "@chakra-ui/react";
import { Team } from "../../../type/team";
import { TeamListItem } from "./TeamListItem";

type Props = {
  teams: Team[];
};

export const TeamList = (props: Props) => {
  const { teams } = props;
  return (
    <Box overflowX={"auto"}>
      <Table variant={"simple"} minWidth="xs">
        <Tbody>
          {teams.map((team) => (
            <TeamListItem key={team.id} team={team} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
