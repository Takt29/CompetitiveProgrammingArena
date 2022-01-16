import { AuditFields } from "./auditField";

export type FireStoreTask = {
  contestId: string;
  index: number;
  name: string;
  externalTaskId: string; // [site]:[contestId]:[problemId]
  score: number;
  originalScore: number;
} & AuditFields;

export type Task = FireStoreTask & {
  id: string;
};
