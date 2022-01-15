import {
  Box,
  Container,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ContestInfoTab } from "../component/contest/tab/ContestInfoTab";
import { ContestStandingsTab } from "../component/contest/tab/ContestStandingsTab";
import { ContestSubmissionsTab } from "../component/contest/tab/ContestSubmissionsTab";
import { ContestTasksTab } from "../component/contest/tab/ContestTasksTab";
import { ContestEndAt } from "../consumer/contest/ContestEndAt";
import { ContestName } from "../consumer/contest/ContestName";
import { ContestStartAt } from "../consumer/contest/ContestStartAt";
import { ContestProvider } from "../hook/context/ContestContext";
import { useFetchContest } from "../hook/firebase/contest";

export const ContestPage = () => {
  const { contestId } = useParams();
  const contest = useFetchContest(contestId ?? "");

  if (!contest) return null;

  return (
    <ContestProvider value={contest}>
      <Container maxWidth={"container.lg"} marginTop={4} marginBottom={4}>
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

        <Tabs>
          <Box overflowX={"auto"}>
            <TabList>
              <Tab _focus={{ outline: "none" }}>Top</Tab>
              <Tab _focus={{ outline: "none" }}>Tasks</Tab>
              <Tab _focus={{ outline: "none" }}>Results</Tab>
              <Tab _focus={{ outline: "none" }}>Standings</Tab>
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
