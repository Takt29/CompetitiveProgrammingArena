import { Container, Heading, Stack } from "@chakra-ui/react";

export const TeamsPage = () => {
  return (
    <Container maxWidth={"container.xl"} marginTop={4} marginBottom={4}>
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
    </Container>
  );
};
