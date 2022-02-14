import { Stack, Heading } from "@chakra-ui/react";
// import { useParams } from "react-router";
import { PageContainer } from "../component/common/PageContainer";
import { TeamName } from "../consumer/team/TeamName";
import { dummyTeams } from "../dummy/team";
import { TeamProvider } from "../hook/context/TeamContext";

export const TeamPage = () => {
  // const { teamId } = useParams();
  const team = dummyTeams[0];

  return (
    <TeamProvider value={team}>
      <PageContainer>
        <Stack spacing={8}>
          <Heading as={"h2"} size="lg">
            Team: <TeamName />
          </Heading>
        </Stack>
      </PageContainer>
    </TeamProvider>
  );
};
