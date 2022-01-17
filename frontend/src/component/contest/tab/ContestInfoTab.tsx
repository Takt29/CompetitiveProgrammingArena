import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { useAsyncFn } from "react-use";
import { ContestDescription } from "../../../consumer/contest/ContestDescription";
import { ContestEndAt } from "../../../consumer/contest/ContestEndAt";
import { ContestOwner } from "../../../consumer/contest/ContestOwner";
import { ContestRulePenalty } from "../../../consumer/contest/ContestRulePenalty";
import { ContestRuleSystem } from "../../../consumer/contest/ContestRuleSystem";
import { ContestStartAt } from "../../../consumer/contest/ContestStartAt";

export const ContestInfoTab = () => {
  const [{ loading }, register] = useAsyncFn(async () => {}, []);

  return (
    <Box>
      <Stack spacing={8}>
        <Box>
          <Text>
            <ContestDescription />
          </Text>
        </Box>

        <Box>
          <Center>
            <Button
              colorScheme={"teal"}
              disabled={loading}
              isLoading={loading}
              onClick={register}
            >
              Register
            </Button>
          </Center>
        </Box>

        <Box>
          <Heading as={"h3"} size={"md"}>
            Information
          </Heading>
          <Divider marginBottom={4} />

          <Table variant={"striped"} size={"sm"}>
            <Tbody>
              <Tr>
                <Td>Owner</Td>
                <Td>
                  <ContestOwner />
                </Td>
              </Tr>
              <Tr>
                <Td>StartAt</Td>
                <Td>
                  <ContestStartAt />
                </Td>
              </Tr>
              <Tr>
                <Td>EndAt</Td>
                <Td>
                  <ContestEndAt />
                </Td>
              </Tr>
              <Tr>
                <Td>Standings System</Td>
                <Td>
                  <ContestRuleSystem />
                </Td>
              </Tr>
              <Tr>
                <Td>Penalty</Td>
                <Td>
                  <ContestRulePenalty />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Box>
  );
};
