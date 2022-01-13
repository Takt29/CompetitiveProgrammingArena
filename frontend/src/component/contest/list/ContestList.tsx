import { Table, Th, Tr, Td, Thead, Tbody, Box } from "@chakra-ui/react";
import { ContestDuration } from "../../../consumer/contest/ContestDuration";
import { ContestName } from "../../../consumer/contest/ContestName";
import { ContestOwner } from "../../../consumer/contest/ContestOwner";
import { ContestStartAt } from "../../../consumer/contest/ContestStartAt";
import { ContestProvider } from "../../../hook/context/ContestContext";
import { Contest } from "../../../type/contest";

const SampleContests: Contest[] = [
  {
    id: "contest_ab2f3",
    name: "バチャ001",
    createdBy: {
      id: "user_a1fewa",
      name: "admin1",
    },
    startAt: new Date(),
    endAt: new Date(new Date().getTime() + 1.75 * 3600 * 1000),
  },
];

export const ContestList = () => {
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
          {SampleContests.map((contest) => (
            <ContestProvider key={contest.id} value={contest}>
              <Tr>
                <Td>
                  <ContestName />
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
