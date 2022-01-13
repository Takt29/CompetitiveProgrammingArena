import { Timestamp } from "firebase/firestore";

export type UserRef = string;

// TODO: dummyではなくなったらPartialを外す
export type AuditFields = Partial<{
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: UserRef;
}>;
