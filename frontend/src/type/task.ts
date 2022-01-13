import { AuditFields } from "./auditField";

type ContestRef = string;

export type Task = {
  id: string;
  contest: ContestRef;
  index: number;
  name: string;
  externalTaskId: string; // [site]:[contestId]:[problemId]
  score: number;
} & AuditFields;
