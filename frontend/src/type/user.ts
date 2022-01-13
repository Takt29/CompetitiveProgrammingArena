import { AuditFields } from "./auditField";

export type User = {
  id: string;
  name: string;
} & AuditFields;
