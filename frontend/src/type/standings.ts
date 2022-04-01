import { Timestamp } from "firebase/firestore";
import { AuditFields } from "./auditField";
import { Contest } from "./contest";
import { Task } from "./task";
import { User } from "./user";

export type StandingsScore = {
  score: number;
  submissionPenalty: number;
  timePenalty: number;
  penalty: number;
};

export type TaskScore = {
  externalScore: number;
  score: number;
  submissionPenalty: number;
  submittedAt: Timestamp | null;
  numOfSubmissions: number;
};

export type FireStoreStandingsItem = {
  contestId: Contest["id"];
  taskScores: { [taskId: Task["id"]]: TaskScore };
  score: StandingsScore;
  sortKey: number[];
} & AuditFields;

export type StandingsItem = FireStoreStandingsItem & {
  userId: User["id"];
};
