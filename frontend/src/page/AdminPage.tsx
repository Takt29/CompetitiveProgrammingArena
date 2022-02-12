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
} from "@chakra-ui/react";
import { RegistrationCodeTab } from "../component/admin/tab/RegistrationCodeTab";
import { SettingsTab } from "../component/admin/tab/SettingsTab";
import { useClaims } from "../hook/firebase/auth";

export const AdminPage = () => {
  const [claims] = useClaims();

  if (!claims?.admin) return null;

  return (
    <Container maxWidth={"container.xl"} marginTop={4} marginBottom={4}>
      <Stack spacing={4}>
        <Heading as="h2" size="lg">
          Admin Page
        </Heading>
        <Tabs isLazy>
          <Box overflowX={"auto"}>
            <TabList>
              <Tab _focus={{ outline: "none" }}>Settings</Tab>
              <Tab _focus={{ outline: "none" }}>Registration Code</Tab>
            </TabList>
          </Box>
          <TabPanels>
            <TabPanel>
              <SettingsTab />
            </TabPanel>
            <TabPanel>
              <RegistrationCodeTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Container>
  );
};
