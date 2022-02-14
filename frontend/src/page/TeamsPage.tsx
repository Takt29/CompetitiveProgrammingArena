import { Container, Heading, Stack } from "@chakra-ui/react";
import { PageContainer } from "../component/common/PageContainer";

export const TeamsPage = () => {
  return (
    <PageContainer>
      <Stack spacing={4}>
        <Heading as={"h2"} size="lg">
          Teams
        </Heading>

        <Heading as={"h3"} size="md">
          My Teams
        </Heading>

        <Heading as={"h3"} size="md">
          Other Teams
        </Heading>
      </Stack>
    </PageContainer>
  );
};
