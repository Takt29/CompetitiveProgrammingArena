import {
  Box,
  Divider,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { ContestDescription } from "../../../consumer/contest/ContestDescription";
import { ContestEndAt } from "../../../consumer/contest/ContestEndAt";
import { ContestOwner } from "../../../consumer/contest/ContestOwner";
import { ContestRulePenalty } from "../../../consumer/contest/ContestRulePenalty";
import { ContestRuleSystem } from "../../../consumer/contest/ContestRuleSystem";
import { ContestStartAt } from "../../../consumer/contest/ContestStartAt";

export const ContestInfoTab = () => {
  return (
    <Box>
      <Box>
        <Text>
          <ContestDescription />
        </Text>
      </Box>
      <Box marginTop={8}>
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
    </Box>
  );
};
