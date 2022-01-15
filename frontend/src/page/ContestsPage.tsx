import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { ContestList } from "../component/contest/list/ContestList";
import { useFetchContests } from "../hook/firebase/contest";
import { Link as ReactRouterLink } from "react-router-dom";

export const ContestsPage = () => {
  const contests = useFetchContests();

  return (
    <Container maxWidth={"container.lg"} marginTop={4} marginBottom={4}>
      <Stack spacing={8}>
        <Box textAlign={"right"}>
          <Button
            variant={"ghost"}
            leftIcon={<Icon as={FaPlus} />}
            as={ReactRouterLink}
            to={"/contests/new"}
          >
            Create Contest
          </Button>
        </Box>
        <Box>
          <Heading as={"h4"} size="md">
            開催中
          </Heading>
          <Divider marginBottom={4} />
          <ContestList contests={contests} />
        </Box>
        <Box>
          <Heading as={"h4"} size="md">
            開催予定
          </Heading>
          <Divider marginBottom={4} />
          <ContestList contests={contests} />
        </Box>
        <Box>
          <Heading as={"h4"} size="md">
            開催済み
          </Heading>
          <Divider marginBottom={4} />
          <ContestList contests={contests} />
        </Box>
      </Stack>
    </Container>
  );
};
