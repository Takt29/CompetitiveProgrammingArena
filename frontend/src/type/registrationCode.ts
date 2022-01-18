import { Timestamp } from "@firebase/firestore";
import { AuditFields } from "./auditField";

export type FireStoreRegistrationCode = {
  expiredAt: Timestamp;
  usedBy?: string;
} & AuditFields;

export type RegistrationCode = FireStoreRegistrationCode & {
  id: string;
};
