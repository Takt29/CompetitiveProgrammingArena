import { Container, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ContestDescription } from "../consumer/contest/ContestDescription";
import { ContestName } from "../consumer/contest/ContestName";
import { ContestProvider } from "../hook/context/ContestContext";
import { useFetchContest } from "../hook/firebase/contest";

export const ContestPage = () => {
  const { contestId } = useParams();
  const contest = useFetchContest(contestId ?? "");

  if (!contest) return null;

  return (
    <ContestProvider value={contest}>
      <Container maxWidth={"container.lg"} marginTop={4} marginBottom={4}>
        <Heading as={"h3"} size="lg" marginBottom={4}>
          <ContestName />
        </Heading>
        <Text>
          <ContestDescription />
        </Text>
      </Container>
    </ContestProvider>
  );
};
