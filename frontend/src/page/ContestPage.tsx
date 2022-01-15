import {
  Box,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ContestInfoTab } from "../component/contest/tab/ContestInfoTab";
import { ContestSubmissionsTab } from "../component/contest/tab/ContestSubmissionsTab";
import { ContestTasksTab } from "../component/contest/tab/ContestTasksTab";
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
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </ContestProvider>
  );
};
