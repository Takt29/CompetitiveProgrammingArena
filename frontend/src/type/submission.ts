import { Timestamp } from "firebase/firestore";
import { AuditFields } from "./auditField";
import { Contest } from "./contest";
import { Task } from "./task";
import { User } from "./user";

export type FireStoreSubmission = {
  contestId: Contest["id"];
  taskId: Task["id"];
  status: string; // TODO: enum
  score: number;
  submittedAt: Timestamp;
  submittedBy: User["id"];
  externalSubmissionId: string; // [site]:[contest]:[id]
} & AuditFields;

export type Submission = FireStoreSubmission & {
  id: string;
};
