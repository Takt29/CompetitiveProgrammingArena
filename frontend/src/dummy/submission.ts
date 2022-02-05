import { Timestamp } from "@firebase/firestore";
import { Submission } from "../type/submission";
import { DummyContests } from "./contest";
import { DummyTasks } from "./task";
import { DummyUsers } from "./user";

export const DummySubmissions: Submission[] = [
  {
    id: "submissions_11",
    contestId: DummyContests[0].id,
    taskId: DummyTasks[0].id,
    status: "AC",
    score: 100,
    language: "C++",
    submittedAt: Timestamp.fromDate(new Date("2021-10-05T14:08:13Z")),
    submittedBy: DummyUsers[1].id,
    externalSubmissionId: "atcoder:abc167:14707314",
  },
  {
    id: "submissions_12",
    contestId: DummyContests[0].id,
    taskId: DummyTasks[1].id,
    status: "WA",
    score: 0,
    language: "Python3",
    submittedAt: Timestamp.fromDate(new Date("2021-10-05T14:10:13Z")),
    submittedBy: DummyUsers[2].id,
    externalSubmissionId: "atcoder:abc167:14707314",
  },
  {
    id: "submissions_21",
    contestId: DummyContests[2].id,
    taskId: DummyTasks[2].id,
    status: "AC",
    score: 100,
    language: "Python3",
    submittedAt: Timestamp.fromDate(new Date("2022-01-01T01:23:45Z")),
    submittedBy: DummyUsers[1].id,
    externalSubmissionId: "aoj::3263614",
  },
];
