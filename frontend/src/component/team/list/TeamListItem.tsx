import { Link, Td, Tr } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { TeamMemberIcons } from "../../../consumer/team/TeamMemberIcons";
import { TeamName } from "../../../consumer/team/TeamName";
import { TeamProvider } from "../../../hook/context/TeamContext";
import { Team } from "../../../type/team";

type Props = {
  team: Team;
};

export const TeamListItem = (props: Props) => {
  const { team } = props;
  return (
    <TeamProvider value={team}>
      <Tr>
        <Td>
          <Link as={ReactRouterLink} to={`/teams/${team.id}`}>
            <TeamName />
          </Link>
        </Td>
        <Td>
          <TeamMemberIcons size="sm" />
        </Td>
      </Tr>
    </TeamProvider>
  );
};
