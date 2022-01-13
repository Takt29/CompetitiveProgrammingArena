import { Task } from "../type/task";
import { DummyContests } from "./contest";

export const DummyTasks: Task[] = [
  {
    id: "task_11",
    contest: DummyContests[0].id,
    index: 1,
    name: "Registration",
    externalTaskId: "atcoder:abc167:abc167_a",
    score: 100,
  },
  {
    id: "task_12",
    contest: DummyContests[0].id,
    index: 2,
    name: "余り",
    externalTaskId: "atcoder:joi2022yo1a:joi2022_yo1a_a",
    score: 100,
  },
  {
    id: "task_21",
    contest: DummyContests[1].id,
    index: 1,
    name: "Party Dress",
    externalTaskId: "aoj::0392",
    score: 100,
  },
];
