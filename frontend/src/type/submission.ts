import { Timestamp } from "firebase/firestore";
import { AuditFields } from "./auditField";
import { Contest } from "./contest";
import { Task } from "./task";
import { User } from "./user";

export type Submission = {
  id: string;
  contestId: Contest["id"];
  taskId: Task["id"];
  status: string; // TODO: enum
  score: number;
  language: string;
  submittedAt: Timestamp;
  submittedBy: User["id"];
  externalSubmissionId: string; // [site]:[contest]:[id]
} & AuditFields;
