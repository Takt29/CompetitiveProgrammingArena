import { Stack, Heading } from "@chakra-ui/react";
import { where } from "firebase/firestore";
import { useParams } from "react-router";
import { PageContainer } from "../component/common/PageContainer";
import { TeamMemberList } from "../component/team/list/TeamMemberList";
import { TeamDescription } from "../consumer/team/TeamDescription";
import { TeamName } from "../consumer/team/TeamName";
import { TeamProvider } from "../hook/context/TeamContext";
import { useFetchTeam, useFetchTeamMembers } from "../hook/firebase/team";

export const TeamPage = () => {
  const { teamId } = useParams();
  const [team] = useFetchTeam(teamId);
  const [members] = useFetchTeamMembers([where("teamId", "==", teamId)]);

  if (!team) return null;

  return (
    <TeamProvider value={team}>
      <PageContainer>
        <Stack spacing={8}>
          <Heading as={"h2"} size="lg">
            Team: <TeamName />
          </Heading>
          <TeamDescription />
          <Stack spacing={4}>
            <Heading as={"h3"} size="md">
              Members
            </Heading>
            <TeamMemberList members={members ?? []} />
          </Stack>
        </Stack>
      </PageContainer>
    </TeamProvider>
  );
};
