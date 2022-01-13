import { Table, Th, Tr, Td, Thead, Tbody, Box, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { ContestDuration } from "../../../consumer/contest/ContestDuration";
import { ContestName } from "../../../consumer/contest/ContestName";
import { ContestOwner } from "../../../consumer/contest/ContestOwner";
import { ContestStartAt } from "../../../consumer/contest/ContestStartAt";
import { ContestProvider } from "../../../hook/context/ContestContext";
import { Contest } from "../../../type/contest";

type Props = {
  contests: Contest[];
};

export const ContestList = (props: Props) => {
  const { contests } = props;

  return (
    <Box overflowX={"auto"}>
      <Table variant={"simple"}>
        <Thead>
          <Tr>
            <Th>コンテスト名</Th>
            <Th>作成者</Th>
            <Th>開始時刻</Th>
            <Th>時間</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contests.map((contest) => (
            <ContestProvider key={contest.id} value={contest}>
              <Tr>
                <Td>
                  <Link as={ReactRouterLink} to={`/contests/${contest.id}`}>
                    <ContestName />
                  </Link>
                </Td>
                <Td>
                  <ContestOwner />
                </Td>
                <Td>
                  <ContestStartAt />
                </Td>
                <Td>
                  <ContestDuration />
                </Td>
              </Tr>
            </ContestProvider>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
