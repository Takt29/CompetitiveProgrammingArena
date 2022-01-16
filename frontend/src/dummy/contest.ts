import { Contest } from "../type/contest";
import { Timestamp } from "firebase/firestore";
import { DummyUsers } from "./user";
import { StandingsSystem } from "../constant/StandingsSystem";

export const DummyContests: Contest[] = [
  {
    id: "contest_a1",
    name: "バチャ001",
    description: "初めてのコンテスト",
    startAt: Timestamp.fromDate(new Date("2021-10-05T14:30:00Z")),
    endAt: Timestamp.fromDate(new Date("2021-10-05T16:00:00Z")),
    rule: {
      system: StandingsSystem.AtCoder,
      penaltyMins: 5,
    },
    createdBy: DummyUsers[0].id,
  },
  {
    id: "contest_b2",
    name: "バチャ002",
    description: "https://atcoder.jp から出題します",
    startAt: Timestamp.fromDate(new Date("2021-11-30T15:00:00Z")),
    endAt: Timestamp.fromDate(new Date("2021-12-25T15:00:00Z")),
    rule: {
      system: StandingsSystem.ICPC,
      penaltyMins: 20,
    },
    createdBy: DummyUsers[1].id,
  },
  {
    id: "contest_c3",
    name: "バチャ003",
    description: "お正月🎍コンテスト\n2時間です。",
    startAt: Timestamp.fromDate(new Date("2022-01-01T00:00:00Z")),
    endAt: Timestamp.fromDate(new Date("2022-01-01T02:00:00Z")),
    rule: {
      system: StandingsSystem.Codeforces,
      penaltyMins: 0,
    },
    createdBy: DummyUsers[1].id,
  },
];
