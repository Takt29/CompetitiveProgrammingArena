import { Container, Divider, Heading } from "@chakra-ui/react";
import { ContestList } from "../component/contest/list/ContestList";

export const ContestsPage = () => {
  return (
    <Container maxWidth={"container.lg"} marginTop={4} marginBottom={4}>
      <Heading as={"h4"} size="md">
        開催中
      </Heading>
      <Divider marginBottom={4} />
      <ContestList />

      <Heading as={"h4"} size="md" marginTop={8}>
        開催予定
      </Heading>
      <Divider marginBottom={4} />
      <ContestList />

      <Heading as={"h4"} size="md" marginTop={8}>
        開催済み
      </Heading>
      <Divider marginBottom={4} />
      <ContestList />
    </Container>
  );
};
