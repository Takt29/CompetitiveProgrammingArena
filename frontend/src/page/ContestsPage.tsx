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
import { limit, orderBy, where } from "firebase/firestore";
import { useMemo } from "react";
import { useNow } from "../hook/utility/useNow";

export const ContestsPage = () => {
  const now = useNow(5 * 60 * 1000);

  // TODO: 暫定対応なので、正しい結果を取れるようにする
  const [notEndedContest] = useFetchContests([
    where("endAt", ">", now),
    orderBy("endAt", "asc"),
    limit(20),
  ]);
  const activeContests = useMemo(
    () =>
      notEndedContest &&
      notEndedContest
        .filter(({ startAt }) => startAt.toMillis() < now.getTime())
        .sort((a, b) => a.startAt.toMillis() - b.startAt.toMillis()),
    [notEndedContest, now]
  );

  const [upcomingContests] = useFetchContests([
    where("startAt", ">", now),
    orderBy("startAt", "asc"),
    limit(10),
  ]);
  const [recentContests] = useFetchContests([
    where("endAt", "<=", now),
    orderBy("endAt", "desc"),
    limit(10),
  ]);

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
          <ContestList contests={activeContests ?? []} />
        </Box>
        <Box>
          <Heading as={"h4"} size="md">
            開催予定
          </Heading>
          <Divider marginBottom={4} />
          <ContestList contests={upcomingContests ?? []} />
        </Box>
        <Box>
          <Heading as={"h4"} size="md">
            開催済み
          </Heading>
          <Divider marginBottom={4} />
          <ContestList contests={recentContests ?? []} />
        </Box>
      </Stack>
    </Container>
  );
};
