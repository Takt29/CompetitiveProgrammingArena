import { Timestamp } from "firebase/firestore";
import { AuditFields } from "./auditField";
import { Contest } from "./contest";
import { Task } from "./task";
import { User } from "./user";

export type FireStoreSubmission = {
  contestId: Contest["id"];
  taskId: Task["id"];
  status:
    | "CE"
    | "WA"
    | "TLE"
    | "MLE"
    | "AC"
    | "OLE"
    | "RE"
    | "PE"
    | "IE"
    | "WJ"
    | "Unknown";
  score: number;
  language: string;
  submittedAt: Timestamp;
  submittedBy: User["id"];
  externalSubmissionId: string; // [site]:[contest]:[id]
} & AuditFields;

export type Submission = FireStoreSubmission & {
  id: string;
};
