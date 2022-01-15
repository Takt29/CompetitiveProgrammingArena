import { Timestamp } from "firebase/firestore";
import { AuditFields } from "../../type/auditField";
import { Contest } from "../../type/contest";
import { Task } from "../../type/task";
import { User } from "../../type/user";

export type StandingsScore = {
  // 合計スコア
  // 合計ペナルティ
  score: number;
  penalty: number;
};

export type TaskScore = {
  // 最大スコア
  // 最大スコアの提出日時
  // 最大スコアの提出までの提出数
  // 全体の提出数
  score: number;
  penalty: number;
  submittedAt: Timestamp;
  allPenalty: number;
  taskId: Task["id"];
};

export type StandingsItem = {
  id: string;
  userId: User["id"];
  contestId: Contest["id"];
  taskScores: TaskScore[];
  score: StandingsScore;
} & AuditFields;
