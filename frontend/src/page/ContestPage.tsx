import {
  Box,
  Container,
  Heading,
  Progress,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { ElapsedTimeBar } from "../component/contest/progress/ElapsedTimeBar";
import { ContestInfoTab } from "../component/contest/tab/ContestInfoTab";
import { ContestStandingsTab } from "../component/contest/tab/ContestStandingsTab";
import { ContestSubmissionsTab } from "../component/contest/tab/ContestSubmissionsTab";
import { ContestTasksTab } from "../component/contest/tab/ContestTasksTab";
import { ContestEndAt } from "../consumer/contest/ContestEndAt";
import { ContestName } from "../consumer/contest/ContestName";
import { ContestStartAt } from "../consumer/contest/ContestStartAt";
import { ContestProvider } from "../hook/context/ContestContext";
import { useAuth } from "../hook/firebase/auth";
import { useFetchContest } from "../hook/firebase/contest";
import { useFetchContestant } from "../hook/firebase/contestant";
import { useNow } from "../hook/utility/useNow";

export const ContestPage = () => {
  const { contestId } = useParams();
  const [auth] = useAuth();
  const [contest] = useFetchContest(contestId);
  const [contestant] = useFetchContestant(contestId, auth?.uid);

  const now = useNow(1000);

  const visible = useMemo(
    () =>
      (!!contestant &&
        contest &&
        contest.startAt.toMillis() <= now.getTime()) ||
      (contest && contest.endAt.toMillis() <= now.getTime()),
    [contest, contestant, now]
  );

  if (!contest) return null;

  return (
    <ContestProvider value={contest}>
      <Container maxWidth={"container.xl"} marginTop={4} marginBottom={4}>
        <Box marginBottom={4}>
          <Stack
            direction={["column", "row"]}
            spacing={4}
            alignItems={["flex-start", "flex-end"]}
          >
            <Heading as={"h3"} size="lg">
              <ContestName />
            </Heading>
            <Text fontSize="sm" as="div">
              <ContestStartAt />
              {"~"}
              <ContestEndAt />
            </Text>
          </Stack>
        </Box>

        <Box marginBottom={4}>
          <ElapsedTimeBar contest={contest} />
        </Box>

        <Tabs isLazy>
          <Box overflowX={"auto"}>
            <TabList>
              <Tab _focus={{ outline: "none" }}>Top</Tab>
              <Tab _focus={{ outline: "none" }} isDisabled={!visible}>
                Tasks
              </Tab>
              <Tab _focus={{ outline: "none" }} isDisabled={!visible}>
                Results
              </Tab>
              <Tab _focus={{ outline: "none" }} isDisabled={!visible}>
                Standings
              </Tab>
            </TabList>
          </Box>
          <TabPanels>
            <TabPanel>
              <ContestInfoTab />
            </TabPanel>
            <TabPanel>
              <ContestTasksTab />
            </TabPanel>
            <TabPanel>
              <ContestSubmissionsTab />
            </TabPanel>
            <TabPanel>
              <ContestStandingsTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </ContestProvider>
  );
};
