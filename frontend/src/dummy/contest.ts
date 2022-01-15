import { Contest } from "../type/contest";
import { Timestamp } from "firebase/firestore";
import { DummyUsers } from "./user";

export const DummyContests: Contest[] = [
  {
    id: "contest_a1",
    name: "バチャ001",
    description: "初めてのコンテスト",
    owner: DummyUsers[0],
    startAt: Timestamp.fromDate(new Date("2021-10-05T14:30:00Z")),
    endAt: Timestamp.fromDate(new Date("2021-10-05T16:00:00Z")),
  },
  {
    id: "contest_b2",
    name: "バチャ002",
    description: "https://atcoder.jp から出題します",
    owner: DummyUsers[1],
    startAt: Timestamp.fromDate(new Date("2021-11-30T15:00:00Z")),
    endAt: Timestamp.fromDate(new Date("2021-12-25T15:00:00Z")),
  },
  {
    id: "contest_c3",
    name: "バチャ003",
    description: "お正月🎍コンテスト\n2時間です。",
    owner: DummyUsers[1],
    startAt: Timestamp.fromDate(new Date("2022-01-01T00:00:00Z")),
    endAt: Timestamp.fromDate(new Date("2022-01-01T02:00:00Z")),
  },
];
