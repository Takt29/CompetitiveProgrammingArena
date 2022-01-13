import { Container, Divider, Heading } from "@chakra-ui/react";
import { ContestList } from "../component/contest/list/ContestList";
import { useFetchContests } from "../hook/firebase/contest";

export const ContestsPage = () => {
  const contests = useFetchContests();

  return (
    <Container maxWidth={"container.lg"} marginTop={4} marginBottom={4}>
      <Heading as={"h4"} size="md">
        開催中
      </Heading>
      <Divider marginBottom={4} />
      <ContestList contests={contests} />

      <Heading as={"h4"} size="md" marginTop={8}>
        開催予定
      </Heading>
      <Divider marginBottom={4} />
      <ContestList contests={contests} />

      <Heading as={"h4"} size="md" marginTop={8}>
        開催済み
      </Heading>
      <Divider marginBottom={4} />
      <ContestList contests={contests} />
    </Container>
  );
};
