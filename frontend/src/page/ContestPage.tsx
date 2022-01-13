import {
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
          <TabList overflowX={"auto"}>
            <Tab>Top</Tab>
            <Tab>Tasks</Tab>
            <Tab>Results</Tab>
            <Tab>Standings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ContestInfoTab />
            </TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </ContestProvider>
  );
};
