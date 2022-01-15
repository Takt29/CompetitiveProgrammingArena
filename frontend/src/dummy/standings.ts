import { Timestamp } from "@firebase/firestore";
import { StandingsItem } from "../type/standings";
import { DummyContests } from "./contest";
import { DummyTasks } from "./task";
import { DummyUsers } from "./user";

export const DummyStandingsItems: StandingsItem[] = [
  {
    id: "standings_11",
    contestId: DummyContests[0].id,
    userId: DummyUsers[1].id,
    taskScores: [
      {
        taskId: DummyTasks[0].id,
        score: 100,
        penalty: 0,
        submittedAt: Timestamp.fromDate(new Date("2021-10-05T14:08:13Z")),
        allPenalty: 1,
      },
    ],
    score: {
      score: 100,
      penalty: 0,
    },
  },
  {
    id: "standings_12",
    contestId: DummyContests[0].id,
    userId: DummyUsers[2].id,
    taskScores: [
      {
        taskId: DummyTasks[1].id,
        score: 0,
        penalty: 0,
        submittedAt: Timestamp.fromDate(new Date(0)),
        allPenalty: 1,
      },
    ],
    score: {
      score: 0,
      penalty: 0,
    },
  },
  {
    id: "standings_21",
    contestId: DummyContests[2].id,
    userId: DummyUsers[1].id,
    taskScores: [
      {
        taskId: DummyTasks[2].id,
        score: 100,
        penalty: 1,
        submittedAt: Timestamp.fromDate(new Date("2022-01-01T01:23:45Z")),
        allPenalty: 2,
      },
    ],
    score: {
      score: 100,
      penalty: 1,
    },
  },
];
