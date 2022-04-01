import { Timestamp } from "firebase/firestore";

export type UserRef = string;

export type AuditFields = {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: UserRef;
};
