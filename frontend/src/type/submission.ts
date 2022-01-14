import { Timestamp } from "firebase/firestore";
import { AuditFields } from "./auditField";

export type Submission = {
  id: string;
  contestId: string; // TODO: 消すか考える
  taskId: string;
  status: string; // TODO: enum
  score: number;
  submittedAt: Timestamp;
  externalSubmissionId: string;
} & AuditFields;
