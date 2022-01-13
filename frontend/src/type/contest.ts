import { Timestamp } from "firebase/firestore";
import { AuditFields } from "./auditField";
import { User } from "./user";

export type Contest = {
  id: string;
  name: string;
  description: string;
  startAt: Timestamp;
  endAt: Timestamp;
  owner: User;
} & AuditFields;
