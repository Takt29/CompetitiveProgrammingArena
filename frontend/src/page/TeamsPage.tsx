import { Box, Button, Heading, Icon, Stack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { Link as ReactRouterLink } from "react-router-dom";
import { PageContainer } from "../component/common/PageContainer";
import { TeamList } from "../component/team/list/TeamList";
import { useFetchMyTeams, useFetchTeams } from "../hook/firebase/team";

export const TeamsPage = () => {
  const [teams] = useFetchTeams();
  const [myTeams] = useFetchMyTeams();

  return (
    <PageContainer>
      <Stack spacing={8}>
        <Box>
          <Heading as={"h2"} size="lg">
            Teams
          </Heading>

          <Box textAlign={"right"}>
            <Button
              variant={"ghost"}
              leftIcon={<Icon as={FaPlus} />}
              as={ReactRouterLink}
              to={"/teams/new"}
            >
              Create Team
            </Button>
          </Box>
        </Box>

        <Stack spacing={2}>
          <Heading as={"h3"} size="md">
            My Teams
          </Heading>

          <TeamList teams={myTeams ?? []} />
        </Stack>

        <Stack spacing={2}>
          <Heading as={"h3"} size="md">
            All Teams
          </Heading>

          <TeamList teams={teams ?? []} />
        </Stack>
      </Stack>
    </PageContainer>
  );
};
