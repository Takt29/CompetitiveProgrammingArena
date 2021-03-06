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
  useToast,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useAsyncFn } from "react-use";
import { Link as ReactRouterLink } from "react-router-dom";
import { createContestant } from "../../../api/contestant";
import { ContestDescription } from "../../../consumer/contest/ContestDescription";
import { ContestEndAt } from "../../../consumer/contest/ContestEndAt";
import { ContestOwner } from "../../../consumer/contest/ContestOwner";
import { ContestRulePenalty } from "../../../consumer/contest/ContestRulePenalty";
import { ContestRuleSystem } from "../../../consumer/contest/ContestRuleSystem";
import { ContestStartAt } from "../../../consumer/contest/ContestStartAt";
import { useContest } from "../../../hook/context/ContestContext";
import { useAuth } from "../../../hook/firebase/auth";
import { useFetchContestant } from "../../../hook/firebase/contestant";
import { useNow } from "../../../hook/utility/useNow";

export const ContestInfoTab = () => {
  const [auth] = useAuth();
  const contest = useContest();
  const toast = useToast();
  const [contestant] = useFetchContestant(contest.id, auth?.uid);

  const isOwner = useMemo(
    () => contest.createdBy && contest.createdBy === auth?.uid,
    [auth?.uid, contest.createdBy]
  );

  const [{ loading }, register] = useAsyncFn(async () => {
    if (!auth) return;
    try {
      await createContestant({
        contestId: contest.id,
        userId: auth.uid,
      });
      toast({
        title: "Registration Completed",
        status: "success",
      });
    } catch (e) {
      toast({
        title: "Failed to register",
        status: "error",
      });
    }
  }, [auth, contest.id, toast]);

  const now = useNow(1000);
  const registerable = useMemo(
    () => now.getTime() < contest.endAt.toMillis() && !contestant,
    [contest.endAt, contestant, now]
  );

  return (
    <Box>
      <Stack spacing={8}>
        {isOwner && (
          <Box textAlign={"right"}>
            <Button
              variant={"link"}
              as={ReactRouterLink}
              to={`/contests/${contest.id}/edit`}
            >
              Edit Contest
            </Button>
          </Box>
        )}
        <Box>
          <Text>
            <ContestDescription />
          </Text>
        </Box>

        {registerable && (
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
        )}

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
